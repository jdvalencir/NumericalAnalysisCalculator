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
import { parse, format  } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";

const PuntoFijo = ({ name }) => {
    const [functionTextF, setFunctionTextF] = useState(
        "log(sin(x)^2 + 1)-(1/2)-x"
    );
    const [functionTextG, setFunctionTextG] = useState("log(sin(x)^2 + 1)-(1/2)");
    const [initialValue, setInitialValue] = useState(-0.5);
    const [tol, setTol] = useState(1e-7);
    const [iter, setIter] = useState(100)
    const [displayHelp, setDisplayHelp] = useState(false);
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [conclusion, setConclusion] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            parse(event.target.functionTextF.value);
            parse(event.target.functionTextG.value);
            setFunctionTextF(event.target.functionTextF.value);
            setFunctionTextG(event.target.functionTextG.value);
            setInitialValue(event.target.initialValue.value);
            setTol(event.target.tol.value);
            setIter(event.target.maxCount.value)
            setError(null);
            const data = { 
                "func": "'@(x)" + event.target.functionTextF.value + "'",
                "funcg": "'@(x)" + event.target.functionTextG.value + "'" ,
                "x0": parseFloat(event.target.initialValue.value),
                "niter": parseInt(event.target.maxCount.value),
                "tol": parseFloat(event.target.tol.value)
            }
            console.log("data", data);
            const res = await fetch("http://127.0.0.1:8000/api/non_linear_eq/calcular_punto_fijo/", 
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
                data => 
                {
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
        <Navbar />
            <MediaContainer width={"1030px"}>
                <Parameters width={"1030px"}>
                    <p>
                        <strong>Parámetros</strong>
                    </p>
                    <p className="mb-3"> 
                        Asegurate que f(X) is <strong>continua</strong> y
                        g(X) es <strong>?? y continua</strong> en el valor dado. 
                        Para eso puedes graficar las funciónes: { " " }
                        <a  className="text-alert-text"
                            href={"/graph?function=" + encodeURIComponent(functionTextF)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            f(x)
                        </a>{" "}
                        y{" "}
                        <a  className="text-alert-text"
                            href={"/graph?function=" + encodeURIComponent(functionTextG)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            g(x)
                        </a>
                        .
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Función f(x)
                            <input
                                type="text"
                                name="functionTextF"
                                defaultValue={functionTextF}
                            />
                        </label>
                        <label>
                            Función g(x)
                            <input
                                type="text"
                                name="functionTextG"
                                defaultValue={functionTextG}
                            />
                        </label>
                        <label>
                            Valor inicial (x0)
                            <input
                                type="text"
                                name="initialValue"
                                defaultValue={initialValue}
                            />
                        </label>
                        <label>
                            Tolerancia
                            <input type="text" name="tol" defaultValue={tol} />
                        </label>
                        <label>
                            Iteraciones (máximo 100)
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
                                        <th>Iteration (i)</th>
                                        <th>xi</th>
                                        <th>f(xi)</th>
                                        <th>g(xi)</th>
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
                                <td key={4}>{format( Object.entries(data)[4][1], { notation: "fixed", precision: 10 })}</td>
                            }  

                        </tr>
                    )) }
                    </tbody>
                            </table>
                            <p>{ conclusion }</p>
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
                    <p>The functions must be continuous and differentiable.</p>
                    <p>Be sure that the function have a root.</p>
                    <p>The initial value is important for the method.</p>
                    <p>Tolerance must have a positive value.</p>
                    <p>The iteration number must be positive.</p>
                </React.Fragment>
            )}
        </>
    );
};

export { PuntoFijo };
