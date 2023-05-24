import { pow, add, abs } from "mathjs";

const normP = (A, val) => {
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result = add(result, pow(abs(A[i][0]), val));
  }
  result = pow(result, 1 / val);
  return result;
};

export default normP;
