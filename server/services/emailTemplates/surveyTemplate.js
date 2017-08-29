module.exports = ( survey )=>{
    return `
<html>
    <div style="text-align: center">
        <h3>Survey maker</h3>
        <div>${survey.body}</div>
        <div>
            <a href="http://localhost:3000/yes">Yes</a>
            <a href="http://localhost:3000/no">No</a>
        </div>
    </div>
</html>
    `;
};