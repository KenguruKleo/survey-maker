const keys = require('../../config/keys');
const redirectDomain = keys.redirectDomain || process.env.REDIRECT_DOMAIN;

module.exports = ( survey )=>{
    return `
<html>
    <div style="text-align: center">
        <h3>Survey maker</h3>
        <div>${survey.body}</div>
        <div>
            <a href="${redirectDomain}/api/surveys/thanks">Yes</a>
            <a href="${redirectDomain}/api/surveys/thanks">No</a>
        </div>
    </div>
</html>
    `;
};