const express = require('express')
const app = express()
var server = require('http').createServer(app);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3001, () => console.log('Example app listening on port 3001!'))


var io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log("Connected")
    client.on('connect', function () {
        console.log("client connected")
    });
    client.on('event', function (data) {
        io.emit('openUrl', "ost" )
    });
    client.on('disconnect', function () {

    });
    client.on('openUrl', function(url) {
    io.emit('url', url);
    })
});
server.listen(3002);
console.log("Socket IO listening on 3002!")