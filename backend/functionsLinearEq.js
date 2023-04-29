const matlab = require('node-matlab');


// TODO 
// MIrar los argumentos que recibe cada una de las funciones

function jacobi(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}//MatlabFunctions/Cap-2-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`MatJacobiSeid('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

function gauss_seidel(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`MatJacobiSeid('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

function sor(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`SOR('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

module.exports = { jacobi, gauss_seidel, sor }