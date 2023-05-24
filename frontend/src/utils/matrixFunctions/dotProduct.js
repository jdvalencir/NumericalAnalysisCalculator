const dotProduct = (A, B) => {
  let result = 0;

  for (let i = 0; i < A.length; i++) {
    result += A[i] * B[i];
  }
  return result;
};

export default dotProduct;
