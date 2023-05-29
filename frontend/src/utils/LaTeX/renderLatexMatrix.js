import { format } from "mathjs";

const renderLatexMatrix = (matrix, fixedNumber) => {
  if (fixedNumber) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[0]) {
        for (let j = 0; j < matrix[0].length; j++) {
          matrix[i][j] = format(parseFloat(matrix[i][j]), {
            notation: "fixed",
            precision: fixedNumber
          });
        }
      } else {
        matrix[i] = format(parseFloat(matrix[i]), {
          notation: "fixed",
          precision: fixedNumber
        });
      }
    }
  }
  return (
    "\\begin{pmatrix}\n" +
    matrix
      .map((row, index) => {
        if (index === matrix.length) return row.join(" & ") + "\n";
        else return row.join(" & ") + "\\\\\n";
      })
      .join("") +
    "\\end{pmatrix}"
  );
};

export default renderLatexMatrix;
