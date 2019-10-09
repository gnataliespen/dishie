exports.trunk = str => {
  if (str.length > 100) {
    let newStr = str.substr(0, 100);
    newStr += "...";
    return newStr;
  }
  return str;
};
