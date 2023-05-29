import React from "react";
import { MatrixParameters, Button } from "../Home/BigContainer";
import styled from "styled-components";
import { Spacing } from "../rules";

const MatrixInput = ({
  matrixSize,
  setMatrix,
  setMethodState,
  matrix,
  type = "A",
}) => {
  if (
    !matrix ||
    Array.isArray(!matrix) ||
    Array.isArray(!matrix[0]) ||
    matrix.length !== matrixSize.rows ||
    matrix[0].length !== matrixSize.columns
  ) {
    matrix = Array(matrixSize.rows);
    for (let i = 0; i < matrixSize.rows; i++) {
      matrix[i] = new Array(matrixSize.columns).fill(0);
      for (let j = 0; j < matrixSize.columns; j++) {
        matrix[i][j] = 1;
      }
    }
  }
  const handleSubmit = event => {
    event.preventDefault();
    let count = 0;
    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.columns; j++) {
        // If the floating point number cannot be parsed, we set 0 for this value
        matrix[i][j] = !isNaN(parseFloat(event.target[count].value))
          ? parseFloat(event.target[count].value)
          : 0;
        count += 1;
      }
    }
    setMatrix(matrix);
    if (type === "A") {
      setMethodState(prevState => ({
        ...prevState,
        matrixA: "matrix",
      }));
    } else if (type === "B") {
      setMethodState(prevState => ({
        ...prevState,
        B: "matrix",
      }));
    } else if (type === "initialValueX0") {
      setMethodState(prevState => ({
        ...prevState,
        initialValueX0: "matrix",
      }));
    }
  };
  return (
    <MatrixParameters>
      <form onSubmit={handleSubmit}>
        {matrix.map((row, indexRow = 1) => {
          return (
            <MatrixRow key={indexRow}>
              {row.map((item, indexColumn = 1) => {
                return (
                  <input
                    key={indexRow + " " + indexColumn}
                    type="text"
                    defaultValue={matrix[indexRow][indexColumn]}
                    name={indexRow + "," + indexColumn}
                  />
                );
              })}
            </MatrixRow>
          );
        })}
        <Button>
          {type === "A"
            ? "Guardar A"
            : type === "B"
            ? "Guardar B"
            : type === "initialValueX0"
            ? "Guardar x0"
            : "Guardar"}
        </Button>
      </form>
    </MatrixParameters>
  );
};

const MatrixRow = styled("div")`
  display: flex;
  flex-direction: row;
  margin: ${Spacing.lg};
`;

export default MatrixInput;
