const childProcess = require('child_process')
const path = require('path')
const { execPromise } = require('./utils')
const { DESTINATION_FOLDER, SOURCE_FOLDER } = require('./constants')

const main = async () => {
    await execPromise('npm run export')
    await execPromise(`
        cd ../${DESTINATION_FOLDER} &&
        rm -rf ./*.html &&
        rm -rf ./index &&
        rm -rf ./_next &&
        cd ../${SOURCE_FOLDER}/docs && 
        cp -r * ../../${DESTINATION_FOLDER} &&
        cd ../
    `)
    const fork = childProcess.fork(path.resolve('./scripts/git.js'))
    fork.on('exit', code => {
        console.log(`Exit code is: ${code}`)
    });
}

process.on('uncaughtException', err => {
    console.error('uncaughtException: ', err.message)
    console.error(err.stack)
    process.exit(1)
})

main()
