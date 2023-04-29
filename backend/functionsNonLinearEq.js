const matlab = require('node-matlab');

// Función para calcular la biseccion
function calcularBiseccion(funcion, a, b, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            matlab.eval(`calcularBiseccion('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

// Función para calcular la regula falsi
function regulaFalsi(funcion, a, b, tolerancia, iteraciones){
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            // Mirar si regula falsi recibe estos argumentos 
            matlab.eval(`rf('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la regula falsi');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

// Función para calcular punto fijo
function puntoFijo(funcion, x0, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            // Mirar si punto fijo recibe estos argumentos 
            matlab.eval(`pf('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

// Funcion para calcular newton
function newton(funcion, x0, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            // Mirar si newton recibe estos argumentos 
            matlab.eval(`newtonTabla('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

// Función para calcular raices multiple
function raicesMultiples(funcion, x0, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            // Mirar si punto fijo recibe estos argumentos 
            matlab.eval(`raices_multiples('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}

// Función para calcular secante
function secante(funcion, x0, tolerancia, iteraciones) {
    return new Promise((resolve, reject) => {
        matlab.eval(`addpath('${__dirname}/MatlabFunctions/Cap-1-non-linear-eq')`, (err) => {
            if (err) {
                reject('Error al agregar el directorio actual a la ruta de búsqueda de Matlab');
                return;
            }
            // Mirar si punto fijo recibe estos argumentos 
            matlab.eval(`MetodoSecante('${funcion}', ${a}, ${b}, ${tolerancia}, ${iteraciones})`, (err, resultados) => {
                if (err) {
                    reject('Error al calcular la bisección');
                    return;
                }
                resolve(JSON.parse(resultados));
            });
        });
    });
}


module.exports = { calcularBiseccion, regulaFalsi, puntoFijo, newton, raicesMultiples, secante };

