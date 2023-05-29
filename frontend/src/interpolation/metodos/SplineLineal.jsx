import React, { useEffect, useState } from "react";
import SetOfPointsInput from "../../Home/SetOfPointsInput";
import {
  TableStyle,
  MediaContainer,  
  Button,
  Error,
  LinkGraph,
  Results,
  Question,
  Parameters,
} from "../../Home/BigContainer";
import styled from "styled-components";

import Latex from "react-latex";
import renderLatexTable from "../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlockMath } from "react-katex";
import renderLatexMatrix from "../../utils/LaTeX/renderLatexMatrix";
import renderLatexPolynom from "../../utils/LaTeX/renderLatexPolynom";
import polynomFromArray from "../../utils/polynomFromArray";
import { Navbar } from "../../Home/Header";
import { column, format, parse } from "mathjs";

const SplineLineal = ({ name }) => {
  const [points, setPoints] = useState({
    x: [-1, 0, 2, 4,5],
    y: [4.3, 5.53, 8, 11.25],
  });
  const [methodState, setMethodState] = useState({
    points: "input",
  });
  const [latexTable, setLatexTable] = useState(
    "\\begin{array}{ |c|c|c|c|c|c|}  \n" +
      " \\hline\n" +
      "x & -2 & -1 & 0 & 1 & 2\\\\ \n" +
      " \\hline\n" +
      "y & 23 & 13 & 5 & -1 & -5\\\\ \n" +
      " \\hline\n" +
      "\\end{array}",
  );
  const [error, setError] = useState(null);
  const [results, setResults] = useState(undefined);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [data, setData] = useState(null)
  const [x, setX] = useState("[0,1,2,3]")
  const [y, setY] = useState("[4,2,6,8]")
  const [tabla,setTabla] = useState([[]])
  const [traz,setTraz] = useState([[]])
  const handleSubmit = async event => {
    console.log("x: ",event.target.x.value)
    console.log("y: ",event.target.y.value)
    event.preventDefault();
    try{
        setX(event.target.x.value);
        setY(event.target.y.value);
        const data = {
            "x": JSON.parse(event.target.x.value),
            "y": JSON.parse(event.target.y.value)
        }
        console.log("data", data);
        const res = await fetch("http://127.0.0.1:8000/api/interpolation/calcular_spline_lineal/", 
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
                console.log("Data: ",data)
                setTabla(data["tabla"])
                console.log("Tabla de coeficientes: ",tabla)
                setTraz(data["trazadores"])
                console.log("trazadores: ",traz)
            });
    }
    catch (e){
        setError(e + "");
    }


  };


  return (
    <>
    <Navbar/>
    <MediaContainer width={"1100px"} className="mt-20">
        <Parameters width={"1100px"}>
                <p className="mb-3">
        <a className="text-alert-text">
       <strong> Los puntos de X y Y los debes de poner dentro de corchetes ('[]'), se separan
        por comas (',') y puedes poner numeros decimales con el punto ('.').
        Recuerda que debe haber la misma cantidad de puntos para X y Y
        </strong>
        </a>
      </p>
    <form onSubmit={handleSubmit}>
    <label>
        Valores de x
        <input type="text" name="x" defaultValue={x}/>
    </label>
    <label>
        Valores de y
        <input type="text" name="y" defaultValue={y}/>
    </label>
    <Button>Spline Lineal</Button>
    </form>
    </Parameters>
    
    </MediaContainer>
    {data && !error ?(
    <Results>

    <React.Fragment>
              <strong> <p>Tabla de coeficientes</p> </strong>
              <TableStyle>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          i
                        </th>
                        <th>
                          Coeficientes 1
                        </th>
                        <th>
                          Coeficientes 2
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {tabla.map((Lx, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            {Lx.map(coeff => {
                              return <td>{coeff}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </TableStyle>
                <strong> <p>Trazadores</p> </strong>
              <TableStyle>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          i
                        </th>
                        <th>
                         Trazadores
                        </th>

                        
                      </tr>
                    </thead>
                    <tbody>
                    {traz.map((Lx, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{Lx}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </TableStyle>

                      <LinkGraph>
                <a
                  href={
                    "/graficar?function=" +
                    encodeURIComponent("")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Graficar 
                </a>
              </LinkGraph>
 
     </React.Fragment>         
    
    
    </Results>
    ):(
        <Results>
        <Error>{error}</Error>
        <Link to={"/help"}>
            <FontAwesomeIcon icon={"question-circle"} /> Help Page
        </Link>
    </Results>
    )
  }
    </>

  );

  };

export { SplineLineal } 