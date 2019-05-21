const { cursos } = require('./cursos')
const fs = require('fs')

//Imprimir el listado de cursos disponibles

let listarCursos = () => {
//Se recorre el arreglo de objetos y en cada iteracion se imprime la informacion pertinente como: Codigo
    for (let i in cursos) {
        let curso = cursos[i]
        setTimeout(() => {
            console.log(`El curso COD[${curso.id}]-${curso.nombre} tiene una duración ${curso.duracion} meses y un valor de ${curso.valor} (COP) Pesos Colombianos`.green);
        }, 2000 * i + 1);
    }
}

//Salir del proceso de prematricula si ingresa un ID invalido

let prematricula = (curso, argv) => {
    if (curso == undefined) {
        console.log('Ha ingresado un ID que no corresponde a ningún curso'.red);
        console.log('Los cursos disponibles en Educación Continua del Tecnológico de Antioquia son:'.blue);
        setTimeout(() => {
            listarCursos();
        }, 1000);
//Sino se crea un archivo de texto "prematricula" con los datos del curso y el estudiante
    }
    else {
        console.log(`Curso COD[${curso.id}]-${curso.nombre} que tiene una duración de ${curso.duracion} meses y un valor ${curso.valor}`.blue);
        registroPrematricula = `El estudiante ${argv.nombre} con cédula ${argv.identificacion} se ha prematriculado en el curso:
COD[${curso.id}]-${curso.nombre} que tiene una duración de ${curso.duracion} meses y un valor ${curso.valor}`;
        fs.writeFile(`prematricula-${argv.nombre}.txt`, registroPrematricula, (err) => {
            if (err) throw (err)
            console.log('Registro de Prematricula guardado'.blue);
        })
    }
}

module.exports = {
    listarCursos,
    prematricula
}