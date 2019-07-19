const jsforce = require('jsforce');
const conn = new jsforce.Connection();

module.exports = {
    connect: (callback) => {
        conn.login('alexinformationtech@gmail.com', '@Salesforce123456zqfYryc9mvmB12WY9CLarKCuf', function(err, response) {
            if (err) {
                return callback(err);
            }
            return callback(null, conn);
        });
    }
}