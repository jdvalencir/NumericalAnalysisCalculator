const matlab = require('node-matlab');


// TODO mirar los argumentos par esta funcion 

function Lagrange(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}//MatlabFunctions/Cap-3-interpolation')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`Lagrange('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

function NewtonInit(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}//MatlabFunctions/Cap-3-interpolation')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`Newtonint('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

module.exports = { Lagrange, NewtonInit }