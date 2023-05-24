function createM(size) {
  let matriz = new Array(size);
  for (let i = 0; i < size; i++) {
    matriz[i] = new Array(size);
  }
  return matriz;
}

const determinant = M => {
  if (M.length === 2) {
    let det = M[0][0] * M[1][1] - M[1][0] * M[0][1];
    return det;
  }
  let suma = 0;
  for (let i = 0; i < M.length; i++) {
    let nm = createM(M.length - 1);
    for (let j = 0; j < M.length; j++) {
      if (j !== i) {
        for (let k = 1; k < M.length; k++) {
          let indice = -1;
          if (j < i) {
            indice = j;
          } else if (j > i) {
            indice = j - 1;
          }
          nm[indice][k - 1] = M[j][k];
        }
      }
    }
    if (i % 2 === 0) {
      suma += M[i][0] * determinant(nm);
    } else {
      suma -= M[i][0] * determinant(nm);
    }
  }
  return suma;
};

export default determinant;
