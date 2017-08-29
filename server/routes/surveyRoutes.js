const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send("Thanks for your feedback!");
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map( email => ({ email: email.trim() }) ),
            _user: req.user.id,
            dateSend: Date.now()
        });

        const mailer = new Mailer( survey, surveyTemplate(survey) );

        try{
            const sendMailResult = await mailer.send();

            if ( sendMailResult.statusCode === 202 ){
                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();

                res.send(user);
            }
        } catch (err){
            const error = 'Error: ' + (err.response && err.response.body && err.response.body.errors || err);
            res.status(422).send({error});
        }

    });
};