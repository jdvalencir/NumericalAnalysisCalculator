const hasDuplicates = array => {
  const set = Array.from(new Set(array));
  return !(JSON.stringify(set) === JSON.stringify(array));
};

export default hasDuplicates;
