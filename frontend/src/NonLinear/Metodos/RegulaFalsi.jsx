import React, { useState } from "react";
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
import { parse, format } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";

const RegulaFalsi = ({ name }) => {
    const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
    const [lowValue, setLowValue] = useState(0);
    const [highValue, setHighValue] = useState(1);
    const [tol, setTol] = useState(1e-7);
    const [iter, setIter] = useState(100)
    const [displayHelp, setDisplayHelp] = useState(false);
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
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
                "func": "'@(x)" + functionText + "'",
                "a": parseInt(lowValue),
                "b": parseInt(highValue),
                "niter": parseInt(iter),
                "tol": parseFloat(tol)
            }
            console.log("data", data);
            const res = await fetch("http://127.0.0.1:8000/api/non_linear_eq/calcular_regula_falsi/", 
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
                    const xn = Object.entries(data)[2][1][0][Object.entries(data)[2][1][0].length - 1]
                    const err = Object.entries(data)[5][1][0][Object.entries(data)[5][1][0].length - 1]                   
                    handleConclusion(xn, err)
                })
        } catch (e) {
            setError(e + "");
        }
    };
    const handleConclusion = (xn, error) => {
        if (error < tol){
            setConclusion("Una aproximación fue encontrada en: " + xn)
        }
        else if (error > tol){
            setConclusion("Dado el número de iteraciones y la tolerancia, no fue posible encontrar una raíz")
        }
        else {
            setConclusion("El método explotó")
        }
    }
    return (
    <>
        <Navbar/>
        <MediaContainer width={"1100px"}>
            <Parameters width={"1100px"}>
            <p className="">
                    <strong>Parámetros</strong>
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
                            <th>Iteration</th>
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
                            {  Object.entries(data)[1][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))} 
                            {  Object.entries(data)[2][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))} 
                            {  Object.entries(data)[3][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                            ))} 
                            {  Object.entries(data)[4][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "exponential", precision: 2 })}</td>
                            ))} 
                            {  Object.entries(data)[5][1].map((columna, columnIndex) => (
                                <td key={columnIndex}>{format(columna[index], { notation: "exponential", precision: 2 })}</td>
                            ))} 
                        </tr>
                    ))}
                    </tbody>
                </table>
                <p>{ conclusion }</p>
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


export { RegulaFalsi }