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

const NewtonRaphson = ({ name }) => {
    const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
    const [initialValueX0, setInitialValueX0] = useState(0.5);
    const [displayHelp, setDisplayHelp] = useState(false);
    const [tol, setTol] = useState(1e-7);
    const [iter, setIter] = useState(100)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
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
                "func": "'@(x)" + event.target.functionText.value + "'",
                "x0": parseFloat(event.target.initialValueX0.value),
                "niter": parseInt(event.target.maxCount.value),
                "tol": parseFloat(event.target.tol.value)
            }
            console.log("data", data);
            const res = await fetch("http://127.0.0.1:8000/api/non_linear_eq/calcular_newton/", 
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
                    if (data["mes_err"].length == 0){                  
                        setConclusion(data["mes"]) 
                    } else { 
                        setError(data["mes_err"])
                    }   
                })
        } catch (e) {
            setError(e + "");
        }
    };

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
                        y{" "}
                        <a  className="text-alert-text"
                            href={"/graficar?function=" + encodeURIComponent(derivative(functionText, 'x'))}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            f'(x)
                        </a>
                        .
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
                                        <th>E</th>
                                    </tr>
                                </thead>
                                <tbody>
                    {data &&  Array.from({ length: Object.entries(data)[0][1] }).map((_, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            { Array.isArray(Object.entries(data)[1][1]) && Object.entries(data)[1][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))}
                            { !Array.isArray(Object.entries(data)[1][1]) &&
                                <td key={1}>{format( Object.entries(data)[1][1], { notation: "fixed", precision: 10 })}</td>
                            }  

                            { Array.isArray(Object.entries(data)[2][1]) && Object.entries(data)[2][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))} 
                            { !Array.isArray(Object.entries(data)[2][1]) &&
                                <td key={2}>{format( Object.entries(data)[2][1], { notation: "fixed", precision: 10 })}</td>
                            }  

                            {  Array.isArray(Object.entries(data)[3][1]) && Object.entries(data)[3][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))} 
                            { !Array.isArray(Object.entries(data)[3][1]) &&
                                <td key={3}>{format( Object.entries(data)[3][1], { notation: "fixed", precision: 10 })}</td>
                            }  

                            {  Array.isArray(Object.entries(data)[4][1]) && Object.entries(data)[4][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "exponential", precision: 4 })}</td>
                            ))} 
                            { !Array.isArray(Object.entries(data)[4][1]) &&
                                <td key={4}>{format( Object.entries(data)[4][1], { notation: "exponential", precision: 3 })}</td>
                            }  

                        </tr>
                    )) }
                    </tbody>
                            </table>
                            <p> { conclusion } </p>
                        </TableStyle>
                    ) : (
                        <Results>
                            <Error>{error}</Error>
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
                        Newton's method is generally faster than the other methods. If the derivative approaches zero, the method loses its speed because is possible to be a case of multiple root.
                    </p>
                    <p>Be sure that the function have a root.</p>
                    <p>The initial value is very very important.</p>
                    <p>Tolerance must have a positive value.</p>
                    <p>The iteration number must be positive.</p>
                </React.Fragment>
            )}
        </>
    );
};

export  { NewtonRaphson };
