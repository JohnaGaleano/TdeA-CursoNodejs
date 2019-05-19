
const opt = {
    id: {
        demand: true,
        alias: 'i'
    },
    identificacion: {
        demand: true,
        alias: 'd',
        default: 10
    },
    nombre: {
        demand: true,
        alias: 'n',
        default: 10
    }
}

const argv = require('yargs')
    .command('prematricula', 'prematriculación en educacion continua', opt)
    .help()
    .argv

module.exports = {
    argv
}