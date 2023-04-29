const express = require('express');
const bodyParser = require('body-parser');
const { calcularBiseccion, regulaFalsi, puntoFijo, newton, raicesMultiples, secante } = require('./functionsNonLinearEq');
const { jacobi, gauss_seidel, sor } = require('./functionsLinearEq')
const { Lagrange, NewtonInit } = require('./functionsInterpolation')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/calcular_biseccion', async (req, res) => {
  // Obtener los datos de entrada del formulario
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await calcularBiseccion(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Mirar si regula falsi recibe estos parametros
app.post('/calcular_regula_falsi', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await regulaFalsi(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_punto_fijo', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await puntoFijo(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_newton', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await newton(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_raices_multiples', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await raicesMultiples(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_secante', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await secante(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_jacobi', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await jacobi(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_gauss_seidel', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await gauss_seidel(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_sor', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await sor(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_lagrange', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await Lagrange(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

// Mirar si recibe estos parametros
app.post('/calcular_newtoninit', async (req, res) => {
    const { funcion, a, b, tolerancia, iteraciones } = req.body;
    try {
        const resultados = await NewtonInit(funcion, a, b, tolerancia, iteraciones);
        // Enviar los resultados como respuesta a la solicitud
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
});