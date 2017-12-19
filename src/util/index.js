function splitString(originString, splitSection) {
  const _arr = [];
  let current_index = 0;
  splitSection.forEach(([index, length]) => {
    _arr.push(originString.substring(current_index, current_index = index));
    _arr.push(originString.substring(current_index, current_index += length));
  })
  _arr.push(originString.substring(current_index));
  return _arr;
}

splitString("I like all blue shades really, but navy in particular is my favourite shade of blue.", [[40, 2], [43, 10]])