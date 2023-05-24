const zeroInDiagonal = M => {
  for (let i = 0; i < M.length; i++) {
    for (let j = 0; j < M[0].length; j++) {
      if (i === j && M[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
};

export default zeroInDiagonal;
