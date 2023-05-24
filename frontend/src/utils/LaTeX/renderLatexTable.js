const renderLatexTable = points => {
  return (
    "\\begin{array}{|c|" +
    points.x.map(item => "c|").join("") +
    "} \n" +
    " \\hline x & " +
    points.x.join(" & ") +
    "\\\\ \n" +
    " \\hline y & " +
    points.y.join(" & ") +
    "\\\\ \n" +
    " \\hline\n" +
    "\\end{array}"
  );
};

export default renderLatexTable;
