const jsforce = require('jsforce');
const conn = new jsforce.Connection();

module.exports = {
    connect: (callback) => {
        conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, response) {
            if (err) {
                return callback(err);
            }
            return callback(null, conn);
        });
    }
}