const exec = require('child_process').exec

const execPromise = (command, options = {}) => {
    return new Promise(function (resolve, reject) {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    }).catch(e => {
        console.log('exec failed with error: ', e)
    });
}

module.exports = { execPromise };