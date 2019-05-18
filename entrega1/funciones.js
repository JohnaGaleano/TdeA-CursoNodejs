const { cursos } = require('./cursos')
const fs = require('fs')

/* Lista de cursos
* 
*/
let listarCursos = () => {

    for (let i in cursos) {
        let curso = cursos[i]
        setTimeout(() => {
            console.log(`El curso ${curso.id}-${curso.nombre} tiene una duración ${curso.duracion} y un valor de ${curso.valor} (COP) Pesos Colombianos`.green);
        }, 2000 * i+1);
    }
}

/*
* Salir del proceso de prematricula si ingresa in ID invalido
* 
*/
let prematricula = (curso, argv) => {
    if (curso == undefined) {
        console.log('Ha ingresado un ID que no corresponde a ningún curso'.red);
        listarCursos();
    }
    else {
        registroPrematricula = `El estudiante ${argv.nombre} con cédula ${argv.identificacion} se ha matriculado en el curso ${curso.id} - ${curso.nombre} tiene una duración de ${curso.duracion} y un valor ${curso.valor}`;
        fs.writeFile('prematricula.txt', registroPrematricula, (err) => {
            if (err) throw (err)
            console.log('Registro de Prematricula guardado'.blue);
        })
    }
}

module.exports = {
    listarCursos,
    prematricula
}