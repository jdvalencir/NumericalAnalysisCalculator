import { divide, multiply, add, subtract } from "mathjs";

const progressiveSustitution = (A, B) => {
  let n = A[0].length;

  let xResult = new Array(n);

  xResult[0] = divide(B[0], A[0][0]);

  for (let i = 1; i < n; i++) {
    let suma = 0;
    for (let j = 0; j < i; j++) {
      suma = add(suma, multiply(A[i][j], xResult[j]));
    }
    xResult[i] = divide(subtract(B[i], suma), A[i][i]);
  }
  return xResult;
};

export default progressiveSustitution;
