exports.trunk = (str, len) => {
  if (str.length > len) {
    let newStr = str.substr(0, len);
    newStr += "...";
    return newStr;
  }
  return str;
};
