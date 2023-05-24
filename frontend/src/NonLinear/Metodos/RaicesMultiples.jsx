import React, { useState } from "react";
import {
    MediaContainer,
    Parameters,
    Eval,
    TableStyle,
    Button,
    Error,
    LinkGraph,
    Results,
    Question,
} from "../../Home/BigContainer";

import { parse, derivative, format } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";

const RaicesMultiples = ({ name }) => {
    const [functionText, setFunctionText] = useState("exp(x) - x - 1");
    const [initialValueX0, setInitialValueX0] = useState(0.5);
    const [displayHelp, setDisplayHelp] = useState(false);
    const [tol, setTol] = useState(1e-7);
    const [iter, setIter] = useState(100)
    const [error, setError] = useState(null);
    const [data, setData] = useState(null)
    const [conclusion, setConclusion] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            parse(event.target.functionText.value);
            setFunctionText(event.target.functionText.value);
            setInitialValueX0(event.target.initialValueX0.value);
            setTol(event.target.tol.value);
            setIter(event.target.maxCount.value);
            setError(null);

            const data = {
                "func": "'@(x)" + functionText + "'",
                "x0": parseFloat(initialValueX0),
                "niter": parseInt(iter),
                "tol": parseFloat(tol)
            }
            console.log("data", data);
            const res = await fetch("http://127.0.0.1:8000/api/non_linear_eq/calcular_raices_multiples/", 
                {
                    method: "POST", 
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                }
            ).then(response => response.json()).then(
                data => {
                    setData(data); 
                    console.log(Object.entries(data)) 
                    const xn = Object.entries(data)[1][1][0][Object.entries(data)[1][1][0].length - 1]
                    const fn = Object.entries(data)[2][1][0][Object.entries(data)[2][1][0].length - 1]
                    const iter = Object.entries(data)[0][1]
                    const err = Object.entries(data)[5][1][0][Object.entries(data)[5][1][0].length - 1] 
                    handleConclusion(xn, fn, err, iter)    
            
                })
        } catch (e) {
            setError(e + "");
        }
    };
    const handleConclusion = (xn, fn, error, iteration) => {
        if (fn === 0){
            setConclusion("La raíz fue encontrada en: " +  xn)
        }
        else if (error <= tol){
            setConclusion("Una aproximación fue encontrada en: " + xn)
        }
        else if (iteration === iter){
            setConclusion("Dado el número de iteraciones y la tolerancia, no fue posible encontrar una raíz")
        }
        else {
            setConclusion("El método explotó")
        }
    }
    return (
        <>
            <Navbar/>
            <MediaContainer width={"900px"}>
                <Parameters width={"900px"}>
                    <p>
                        <strong>Parámetros</strong>
                    </p>
                    <p className="mb-3">
                        Asegurate que la función sea continua en el valor dado, y la derivada 
                        no sea igual a cero (0) en ninguno de los puntos a analizar. 
                        Para eso puedes graficar las funciónes: { " " }
                        <a  className="text-alert-text"
                            href={"/graficar?function=" + encodeURIComponent(functionText)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            f(x)
                        </a>{" "}
                        <a  className="text-alert-text"
                            href={"/graficar?function=" + encodeURIComponent(derivative(functionText, 'x'))}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            f'(x)
                        </a>{" "}
                        <a  className="text-alert-text"
                            href={"/graficar?function=" + encodeURIComponent(derivative(derivative(functionText, 'x'), 'x'))}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            f''(x)
                        </a>{" "}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Función f
                            <input
                                type="text"
                                name="functionText"
                                defaultValue={functionText}
                            />
                        </label>
                        <label>
                            Valor inicial (x0)
                            <input
                                type="text"
                                name="initialValueX0"
                                defaultValue={initialValueX0}
                            />
                        </label>
                        <label>
                            Tolerancia
                            <input type="text" name="tol" defaultValue={tol} />
                        </label>
                        <label>
                            Iteraciones (maximo 100)
                            <input type="text" name="maxCount" defaultValue={iter} />
                        </label>
                        <Button>Ejecutar</Button>
                    </form>
                </Parameters>
                <Eval>
                    <p>
                        <strong>{name}</strong>
                    </p>
                    {!error ? (
                        <TableStyle>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Iteración (i)</th>
                                        <th>xi</th>
                                        <th>f(xi)</th>
                                        <th>f'(xi)</th>
                                        <th>f''(xi)</th>
                                        <th>E</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data &&  Array.from({ length: Object.entries(data)[0][1] + 1}).map((_, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            {  Object.entries(data)[1][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index],  { notation: "fixed", precision: 15 })}</td>
                            ))} 
                            {  Object.entries(data)[2][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index],  { notation: "fixed", precision: 15 })}</td>
                            ))} 
                            {  Object.entries(data)[3][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format( columna[index],  { notation: "fixed", precision: 15 })}</td>
                            ))} 
                            {  Object.entries(data)[4][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format( columna[index],  { notation: "fixed", precision: 15 })}</td>
                            ))} 
                            {  Object.entries(data)[5][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format( columna[index],  { notation: "exponential", precision: 3 })}</td>
                            ))} 
                        </tr>
                    ))}
                                </tbody>
                            </table>
                            <p> { conclusion } </p>
                        </TableStyle>
                    ) : (
                        <Results>
                            <Error>{error}</Error>
                            <Link to={"/help"}>
                                <FontAwesomeIcon icon={"question-circle"} /> Help Page
                            </Link>
                        </Results>
                    )}
                </Eval>
            </MediaContainer>
            <Question
                onClick={() => setDisplayHelp(!displayHelp)}
                active={displayHelp}
            >
                Help
            </Question>
            {displayHelp && (
                <React.Fragment>
                    <p>
                    The convergence decreases or stops if there is any division by zero.
                    </p>
                    <p>Las derivadas las obtiene el sistema :)</p>
                    <p>The function must be continuous and differentiable.</p>
                    <p>Tolerance must have a positive value.</p>
                    <p>The iteration number must be positive.</p>
                    </React.Fragment>
            )}
        </>
    );
};

export  { RaicesMultiples };
