import React, { useEffect, useState } from "react";
import MatrixInput from "../MatrixInput";
import MatrixInputSize from "../MatrixSizeInput";
import renderLatexMatrix from "../../utils/LaTeX/renderLatexMatrix"
import { Navbar } from "../../Home/Header";

import {
    Parameters,
    Button,
    TableStyle,
    Error,
    Results,
    Inputs,
    Column,
    Question,
} from "../../Home/BigContainer";
import styled from "styled-components";
import { Colors } from "../../rules";
import { column, format, log } from "mathjs";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MetodosIterativos = ({ name }) => {
    const [matrixASize, setMatrixASize] = useState({
        rows: 4,
        columns: 4,
    });
    const [matrixA, setMatrixA] = useState([
        [4, -1, -0, 3],
        [1, 15.5, 3, 8],
        [0, -1.3, -4, 1.1],
        [14, 5, -2, 30],
    ]);
    const [B, setB] = useState([[1, 1, 1, 1]]);
    const [latexMatrixA, setLatexMatrixA] = useState(
        "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}",
    );
    const [latexB, setLatexB] = useState(
        "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
    );
    const [latexInitialValueX0, setLatexInitialValueX0] = useState(
        "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
    );
    const [initialValueX0, setInitialValueX0] = useState([[ [0], [0], [0], [0]]] );
    const [method, setMethod] = useState(1);
    const [tol, setTol] = useState(1e-7);
    const [normValue, setnormValue] = useState(2);
    const [NMax, setNMax] = useState(100);
    const [wValue, setWValue] = useState(1);
    const [error, setError] = useState(null);
    const [paramSet, setParamSet] = useState(false);
    const [results, setResults] = useState(undefined);
    const [displayHelp, setDisplayHelp] = useState(false);
    const [conclusion, setConclusion] = useState('')
    const [methodState, setMethodState] = useState({
        matrixA: "inputSize",
        B: "input",
        initialValueX0: "input",
    });
    const handleSubmit = event => {
        event.preventDefault();
        setTol(parseFloat(event.target.tol.value));
        setnormValue(parseInt(event.target.normValue.value));
        setWValue(parseFloat(event.target.wValue && event.target.wValue.value));
        setNMax(parseInt(event.target.NMax.value));
        setParamSet(true);
    };
    const fuctionFetch = async () => {
        const data = {
            "A": matrixA,
            "b": B,
            "x0": initialValueX0,
            "tol": tol,
            "norm": normValue,
            "niter": NMax,
            "l": method,
            "w": wValue
        }
        console.log(data);
    try {
        const res = await fetch("http://127.0.0.1:8000/api/linear_eq/calcular_metodos_iterativos/", {
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
        }).then(response => response.json()).then(
            data => {
                setResults(data); 
                console.log(data) 
                if (data["mes_err"].length == 0){                  
                    setConclusion(data["mes"]) 
                } else { 
                    setError(data["mes_err"])
                }   
            })
        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(()  => {
        setError(null);
        setLatexMatrixA(renderLatexMatrix(matrixA));
        setLatexB(renderLatexMatrix(B));
        setLatexInitialValueX0(renderLatexMatrix(initialValueX0));
        console.log("A", );
        if (
            methodState.matrixA === "matrix" &&
            methodState.B === "matrix" &&
            methodState.initialValueX0 === "matrix" &&
            paramSet
        ) {
            try {
                fuctionFetch();
            } catch (e) {
                setError(e + "");
            }
        } else {
            setResults(undefined);
        }
    }, [
        matrixA,
        B,
        methodState,
        paramSet,
        NMax,
        initialValueX0,
        method,
        normValue,
        tol,
        wValue,
    ]);
    return (
        <>
            <Navbar/>
            <ParametersMatrix>
                {!paramSet ? (
                    <React.Fragment>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Método{"  "}
                                <select
                                    name="method"
                                    value={method}
                                    onChange={event => setMethod(parseInt(event.target.value))}
                                >
                                    <option value={1}>Gauss-Seidel</option>
                                    <option value={2}>Jacobi</option>
                                    <option value={3}>SOR</option>
                                </select>
                            </label>
                            {method === 3 && (
                                <label>
                                    W valor (Parámetro de relajación)
                                    <input
                                        type="number"
                                        name="wValue"
                                        step={0.01}
                                        min={0}
                                        max={2}
                                        defaultValue={wValue}
                                    />
                                </label>
                            )}
                            <label>
                                Tolerancia
                                <input type="text" name="tol" defaultValue={tol} />
                            </label>
                            <label>
                                Norma {"  "}
                                <select name="normValue" defaultValue={normValue}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value="inf">inf</option>
                                </select>
                            </label>
                            <label>
                                Iteraciones (max 100)
                                <input type="number" name="NMax" defaultValue={100} />
                            </label>
                            <Button>Confirmar parámetros</Button>
                        </form>
                    </React.Fragment>
                ) : (
                    <Column>
                        <ul>
                            <li>Tolerancia : {tol}</li>
                            <li>Norma : {normValue}</li>
                            <li>Iteraciones : {NMax}</li>
                            <li>
                                Métodos :{" "}
                                {method === 1
                                    ? "Jacobi"
                                    : method === 2
                                        ? "Gauss-Seider"
                                        : "SOR"}
                            </li>
                            {method === 3 && (
                                <li>W valor (Parámetro de la relajación) : {wValue}</li>
                            )}
                        </ul>
                        <Button onClick={() => setParamSet(false)}>
                                Cambiar parámetros
                        </Button>
                    </Column>
                )}
            </ParametersMatrix>
            <Inputs>
                {methodState.matrixA === "inputSize" ? (
                    <MatrixInputSize
                        matrixSize={matrixASize}
                        setMatrixSize={object => setMatrixASize(object)}
                        setMethodState={object => setMethodState(object)}
                        methodState={methodState}
                    />
                ) : methodState.matrixA === "inputMatrix" ? (
                    <Column>
                        <MatrixInput
                            type={"A"}
                            matrix={matrixA}
                            matrixSize={matrixASize}
                            setMatrix={matrix => setMatrixA(matrix)}
                            setMethodState={value => setMethodState(value)}
                        />
                        <Button
                            onClick={() => {
                                setMethodState(prevState => ({
                                    ...prevState,
                                    matrixA: "inputSize",
                                }));
                            }}
                        >
                            Cambiar el tamaño de la matriz
                        </Button>
                    </Column>
                ) : (
                    methodState.matrixA === "matrix" && (
                        <Column>
                            <BlockMath math={"A = " + latexMatrixA} />
                            <Button
                                onClick={() => {
                                    setMethodState(prevState => ({
                                        ...prevState,
                                        matrixA: "inputMatrix",
                                    }));
                                }}
                            >
                                Cambiar A
                            </Button>
                        </Column>
                    )
                )}
                {methodState.initialValueX0 === "input" ? (
                    <MatrixInput
                        type={"initialValueX0"}
                        matrix={initialValueX0}
                        matrixSize={{ ...matrixASize, columns: 1 }}
                        setMatrix={matrix => setInitialValueX0(matrix)}
                        setMethodState={value => setMethodState(value)}
                    />
                ) : (
                    methodState.initialValueX0 === "matrix" && (
                        <Column>
                            <BlockMath math={"x0 = " + latexInitialValueX0} />
                            <Button
                                onClick={() => {
                                    setMethodState(prevState => ({
                                        ...prevState,
                                        initialValueX0: "input",
                                    }));
                                }}
                            >
                                Cambiar x0
                            </Button>
                        </Column>
                    )
                )}
                {methodState.B === "input" ? (
                    <MatrixInput
                        type={"B"}
                        matrix={B}
                        matrixSize={{ ...matrixASize, columns: 1 }}
                        setMatrix={matrix => setB(matrix)}
                        setMethodState={value => setMethodState(value)}
                    />
                ) : (
                    methodState.B === "matrix" && (
                        <Column>
                            <BlockMath math={"b = " + latexB} />
                            <Button
                                onClick={() => {
                                    setMethodState(prevState => ({
                                        ...prevState,
                                        B: "input",
                                    }));
                                }}
                            >
                                Cambiar B
                            </Button>
                        </Column>
                    )
                )}
            </Inputs>
            {results && !error ? (
                <Results>
                    <BlockMath math={"T = " + renderLatexMatrix(results["mt"], 10)} />
                    <BlockMath math={"C = " + renderLatexMatrix(results["mc"][0].map(valor => [valor]), 10)} />
                    <p>
                        <strong>Radio espectral</strong> :{" "}
                        {results["radioEspectral"] &&
                            format(results["radioEspectral"], {
                                notation: "fixed",
                                precision: 6,
                            })}
                    </p>
                    {!error ? (
                        <TableStyle>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Iteración (i)</th>
                                        <th>Error</th>
                                        <th> Xn </th>
                                    </tr>
                                </thead>
                                <tbody>
                                { results && Array.from({ length: results["iter"] }).map((_, index) => {
                                    return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        {results["error"].map((columna, columnIndex) => (
                                            <td key={columnIndex}>{format(columna[index], { notation: "fixed", precision: 10 })}</td>
                                        ))}
                                        <td>
                                            {results["x"][index] && (
                                                <BlockMath math={renderLatexMatrix(results["x"][index].map(valor => [valor]), 6)} />
                                            )}
                                        </td>
                                    </tr>
                                    );
                                })}
                                </tbody>
                                </table>
                            <p> { conclusion } </p>
                        </TableStyle>
                    ) : (
                        <React.Fragment>
                            <Error>{error}</Error>
                        </React.Fragment>
                    )}
                </Results>
            ) : (
                error && (
                    <Results>
                        <Error>{error}</Error>
                    </Results>
                )
            )}
            <Question
                onClick={() => setDisplayHelp(!displayHelp)}
                active={displayHelp}
            >
                Help
                <FontAwesomeIcon
                    icon={displayHelp ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
                />
            </Question>
            {displayHelp && (
                <React.Fragment>
                    <p>
                        In sor if w = 1 we is like Gauss-Seidel method.
                    </p>
                    <p>In sor if 0 minus w minus 1 we got sub-relaxation methods (used in non-convergent Gauss-Seidel systems).</p>
                    <p>In sor if 1 minus w minus 2 we got over-relaxation methods (used to "increase" the speed of some methods).</p>
                    <p>The initial vector isn´t too important.</p>
                    <p>the determinant of the matrix cannot be 0.</p>
                    <p>The matrix cannot have a 0 on the main diagonal</p>
                    <p>The number of iterations mus be positive.</p>
                    <p>The tolerance must be positive..</p>
                </React.Fragment>
            )}
        </>
    );
};

const ParametersMatrix = styled(Parameters)`
  display: flex;
  justify-content: center;
  form {
    display: grid;
    grid-template-rows: 75px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 200px 200px 200px 200px;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 990px) {
      grid-template-columns: 200px 200px 200px;
    }
    @media (max-width: 790px) {
      grid-template-columns: 200px 200px;
    }
    @media (max-width: 600px) {
      grid-template-columns: 200px;
    }
  }
  select {
    border: 2px solid ${Colors.primary.ocean.default};
  }
`;

export { MetodosIterativos };
