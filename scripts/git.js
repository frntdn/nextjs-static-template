
const { execPromise } = require('./utils')
const { DESTINATION_FOLDER } = require('./constants')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async () => {
    rl.question('Enter commit message: ', async commitMessage => {
        await execPromise(`
            cd ../${DESTINATION_FOLDER} &&
            git add . &&
            git commit -m ${commitMessage} &&
            git push origin master -f
        `)
        rl.close()
    });
}

main()