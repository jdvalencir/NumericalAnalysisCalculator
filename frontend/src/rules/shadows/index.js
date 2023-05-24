import Colors from "../colors";

// Different shadows to represent different depths
const level1 =
  "0 1px 3px " +
  Colors.utility.black.default +
  "12, 0 1px 2px " +
  Colors.utility.black.default +
  "24";
const level2 =
  "0 3px 6px " +
  Colors.utility.black.default +
  "15, 0 2px 4px " +
  Colors.utility.black.default +
  "12";
const level3 =
  "0 10px 20px " +
  Colors.utility.black.default +
  "15, 0 3px 6px " +
  Colors.utility.black.default +
  "10";
const level4 =
  "0 15px 25px " +
  Colors.utility.black.default +
  "15, 0 5px 10px " +
  Colors.utility.black.default +
  "05";
const level5 = "0 20px 40px " + Colors.utility.black.default + "02";

const Shadows = {
  level1,
  level2,
  level3,
  level4,
  level5
};

export default Shadows;
