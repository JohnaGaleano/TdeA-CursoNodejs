const argv = require('./config/yargs').argv

const colors = require('colors')

const { listarCursos, prematricula } = require('./funciones')
const { cursos } = require('./cursos')

//Recibo el primer parametro ingresado por el usuario(opcional para el usuario)
let comando = argv._[0]

//Validación si el usuario esta interesado en premaricular
if (comando == 'inscribir') {
    //Busca el curso indicado por el usuario
    let curso = cursos.find(curso => curso.id == argv.id)
    //realiza el proceso de matricula
    prematricula(curso, argv)
}
//En caso de no estar interesado en hacer el proceso de prematricula, se mostrarra la lista de cursos disponibles
else {
    console.log('Cursos Ofrecidos en Educación Continua del Tecnológico de Antioquia');
    setTimeout(() => {
        listarCursos();
    }, 1000);
}



