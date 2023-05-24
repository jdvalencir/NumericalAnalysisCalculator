const renderLatexPolynom = array => {
  let values = array.flat();
  let size = values.length;
  let count = 0;
  return values
    .map((value, index) => {
      let sign;
      let power = size - index - 1;
      let x = power === 0 ? "" : power === 1 ? "x" : "x^{" + power + "}";
      if (index === 0) {
        sign = "";
      } else {
        value < 0 ? (sign = " ") : (sign = " + ");
      }
      if (value !== 0) {
        count += 1;
        if (count === 1) {
          sign = "";
        }
        if (value === 1) {
          value = "";
        }
      }
      return sign + value + x;
    })
    .join("");
};

export default renderLatexPolynom;
