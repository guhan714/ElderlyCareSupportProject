const notifier = require('node-notifier');



function Success(message) {
    notifier.notify({
        title:'Alert',
        message:message,
        sound:true,
        wait:true
    });
}


module.exports = Success;