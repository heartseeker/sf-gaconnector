const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000; 
const helper = require('./functions');
const dotenv = require('dotenv');
dotenv.config();

const connections = [];

io.sockets.on('connection', (socket) => { 
    connections.push(socket);
    console.log('Connected: %s', connections.length);

    helper.connect((err, connect) => {
        if (err == null) {
            connect.streaming.topic("NewTestOpportunityUpdates").subscribe(function(message) {
                socket.emit('Opportunity', message);
            });
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s', connections.length);
    });
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// ROUTES FOR OUR API
// =============================================================================

app.get('/', (req, res) => {
    res.send('This is the home api');
});

app.get('/api/opportunity', (req, res) => {
    helper.connect((err, connect) => {
        if (!err) {
            connect.query('SELECT Name, CloseDate, StageName FROM Opportunity', function(err, opportunity) {
                if (err) {
                    return res.send(err); 
                }
                res.send(opportunity.records);
            });
        }
    });
});

server.listen(port, () => {
    console.log(process.env.username);
    console.log('running on port http://localhost:' + port);
});

