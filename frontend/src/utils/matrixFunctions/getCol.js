const getCol = (matrix, col) => {
  let column = [];
  for (let i = 0; i < matrix.length; i++) {
    column.push([matrix[i][col]]);
  }
  return column;
};

export default getCol;
