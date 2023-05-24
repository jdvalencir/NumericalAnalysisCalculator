const triu = m => {
  if (m.length !== m[0].length) throw new Error("Not a square matrix");
  let returnMatrix = Array(m.length);
  for (let i = 0; i < m.length; i++) {
    returnMatrix[i] = new Array(m[0].length).fill(0);
    for (let j = 0; j < m[0].length; j++) {
      if (i <= j) returnMatrix[i][j] = m[i][j];
      else returnMatrix[i][j] = 0;
    }
  }
  return returnMatrix;
};

export default triu;
