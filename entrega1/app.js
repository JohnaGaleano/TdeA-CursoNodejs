const argv = require('./config/yargs').argv

const colors = require('colors')

const { listarCursos, prematricula } = require('./funciones')
const { cursos } = require('./cursos')

let comando = argv._[0]

if (comando == 'prematricula') {
    let curso = cursos.find(curso => curso.id == argv.id)
    prematricula(curso, argv)
}
else {
    console.log('Cursos Educación Continua del Tecnológico de Antioquia');
    listarCursos();
}



