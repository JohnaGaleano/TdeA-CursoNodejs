
const opt = {
    id: {
        demand: true,
        alias: 'i'
    },
    identificacion: {
        demand: true,
        alias: 'd'
    },
    nombre: {
        demand: true,
        alias: 'n'
    }
}

const argv = require('yargs')
    .command('inscribir', 'prematriculación en educacion continua', opt)
    .help()
    .argv

module.exports = {
    argv
}