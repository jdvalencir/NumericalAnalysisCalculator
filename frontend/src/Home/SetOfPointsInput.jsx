import React, { useEffect, useState } from "react";
import { Parameters, Button, TableStyle } from "../Home/BigContainer";
import styled from "styled-components";
import { Spacing } from "../rules";

const SetOfPointsInput = ({ points, setPoints, setMethodState }) => {
  const [nbPoints, setNbPoints] = useState(points.x.length);
  useEffect(() => {
    if (points.x.length < nbPoints) {
      setPoints(() => ({
        x: points.x.concat(0),
        y: points.y.concat(0),
      }));
    } else if (points.x.length > nbPoints) {
      setPoints(() => ({
        x: points.x.slice(0, nbPoints),
        y: points.y.slice(0, nbPoints),
      }));
    }
  }, [nbPoints, points.x, points.y, setPoints]);
  const handleSubmit = event => {
    event.preventDefault();
    let tempPoints = {
      x: [],
      y: [],
    };
    for (let i = 0; i < nbPoints; i++) {
      tempPoints.x.push(event.target[i].value);
    }
    for (let j = nbPoints + 1; j < nbPoints * 2 + 1; j++) {
      tempPoints.y.push(event.target[j].value);
    }
    setPoints(tempPoints);
    setMethodState(prevState => ({
      ...prevState,
      points: "fixed",
    }));
  };
  return (
    <CustomParameters>
      <form onSubmit={handleSubmit}>
        <TableSetOfPointsStyle>
          <table>
            <tbody>
              <tr>
                <FirstRow>
                  <strong>x</strong>
                </FirstRow>
                {points.x.map((set, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="number"
                        step={0.00000001}
                        defaultValue={points.x[index]}
                      />
                    </td>
                  );
                })}
                <td>
                  <button
                    type="button"
                    onClick={() => setNbPoints(points.x.length + 1)}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <FirstRow>
                  <strong>y</strong>
                </FirstRow>
                {points.y.map((set, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="number"
                        step={0.00000001}
                        defaultValue={points.y[index]}
                      />
                    </td>
                  );
                })}
                <td>
                  <button
                    type="button"
                    onClick={() => setNbPoints(points.x.length - 1)}
                  >
                    -
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </TableSetOfPointsStyle>
        <br />
        <Button>{"Run"}</Button>
      </form>
    </CustomParameters>
  );
};

const CustomParameters = styled(Parameters)`
  input {
    padding: 13px 0;
    text-align: center;
    margin: 0px 5px;
    height: 12px;
    width: 50px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  margin-bottom: ${Spacing.xs};
`;

const FirstRow = styled("td")`
  padding: ${Spacing.sm} ${Spacing.md} !important;
`;

const TableSetOfPointsStyle = styled(TableStyle)`
  tr {
    background: white !important;
  }
`;

export default SetOfPointsInput;