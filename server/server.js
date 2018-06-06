const express = require('express')
const app = express()
var server = require('http').createServer(app);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3001, () => console.log('Example app listening on port 3001!'))


var io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log("Connected")

    client.on('openUrl', function(url) {
        io.emit('url', url);
    })
    client.on('killApplication', function(name) {
        io.emit('killApplication', name);
    })
    client.on('changeVolume', function(volume) {
        io.emit('changeVolume', volume);
    })
    client.on('say', function(speach) {
        io.emit('say', speach);
    })
    client.on('powerOff', function() {
        io.emit('powerOff');
    })
    client.on('notification', function (notification) {
        io.emit('notification',notification.title, notification.message,
        notification.sound, notification.time, notification.wait, notification.type);
    });



    
});
server.listen(3002);
console.log("Socket IO listening on 3002!")