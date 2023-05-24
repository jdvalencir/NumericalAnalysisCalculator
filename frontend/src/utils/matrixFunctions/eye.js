const eye = a => {
  let result = new Array(a);
  for (let i = 0; i < a; i++) {
    result[i] = new Array(a);
    result[i].fill(0);
    result[i][i] = 1;
  }
  return result;
};

export default eye;
