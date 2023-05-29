import React, { useEffect, useState } from "react";
import {
    Parameters,
    Eval,
    TableStyle,
    Button,
    Error,
    LinkGraph,
    MediaContainer,
    Results,
    Question,
} from "../../Home/BigContainer";
import { format, parse } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";

const Biseccion = ({ name }) => {
    const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
    const [lowValue, setLowValue] = useState(0);
    const [highValue, setHighValue] = useState(1);
    const [tol, setTol] = useState(1e-7);
    const [iter, setIter] = useState(100)
    const [displayHelp, setDisplayHelp] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null)
    const [conclusion, setConclusion] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            parse(event.target.functionText.value);
            setFunctionText(event.target.functionText.value);
            setLowValue(event.target.lowValue.value);
            setHighValue(event.target.highValue.value);
            setTol(event.target.tol.value);
            setIter(event.target.maxCount.value)
            setError(null);
            const data = {
            "func": "'@(x)" + event.target.functionText.value + "'",
            "a": parseFloat(event.target.lowValue.value),
            "b": parseFloat(event.target.highValue.value),
            "niter": parseInt(event.target.maxCount.value),
            "tol": parseFloat(event.target.tol.value)
            }
            console.log("data", data);
            const res = await fetch("http://127.0.0.1:8000/api/non_linear_eq/calcular_biseccion/", 
                {
                    method: "POST", 
                    mode: "cors", 
                    cache: "no-cache",
                    credentials: "same-origin", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow", 
                    referrerPolicy: "no-referrer", 
                    body: JSON.stringify(data),
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
        <MediaContainer width={"1100px"} className="mt-20">
            <Parameters width={"1100px"}>
                <p className="">
                    <strong>Párametros</strong>
                </p>
                <p className="mb-3">
                    Asegurate que la función sea continua para el intervalo dado. 
                    Para eso puedes graficar la función: { " " }
                    <a  className="text-alert-text"
                        href={"/graficar?function=" + encodeURIComponent(functionText)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Gráficar f(x).
                    </a>
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Función
                        <input
                            type="text"
                            name="functionText"
                            defaultValue={functionText}
                        />
                    </label>
                    <label>
                        Valor inferior del intervalo (a)
                        <input type="text" name="lowValue" defaultValue={lowValue} />
                    </label>
                    <label>
                        Valor superior del intervalo (b)
                        <input type="text" name="highValue" defaultValue={highValue} />
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
                <TableStyle widthTwo={"584px"}>
                <table>
                    <thead>
                        <tr>
                            <th>Iteración</th>
                            <th>a</th>
                            <th>xm</th>
                            <th>b</th>
                            <th>f(xm)</th>
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

                            {  Array.isArray(Object.entries(data)[5][1]) && Object.entries(data)[5][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "exponential", precision: 2 })}</td>
                            ))}
                            { !Array.isArray(Object.entries(data)[5][1]) &&
                                <td key={5}>{format( Object.entries(data)[5][1], { notation: "fixed", precision: 10 })}</td>
                            }  

                        </tr>
                    )) }
                    </tbody>
                </table>
                <p>{ conclusion } </p>
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
                        The function must be continuous and differentiable,  in addition the specific function evaluated at the interval ends must have a different sign.
                    </p>
                    <p>The value of A must be minor than b.</p>
                    <p>Tolerance must have a positive value.</p>
                    <p>Both values, a and b must exist in the function.</p>
                    <p>The iteration number must be positive.</p>
                </React.Fragment>
            )}
        </>
    );
};


export { Biseccion }