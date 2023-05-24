const zeros = (a) => {
  let result = new Array(a);
  for (let i = 0; i < a; i++) {
    result[i] = new Array(a);
    for (let j = 0; j < a; j++) {
      result[i][j] = 0;
    }
  }
  return result;
};

export default zeros;
