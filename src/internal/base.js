function to_base_98(x) {
  x = Math.abs(x);
  if(x == 0) {
    return characters.int_to_char(0);
  }
  var digits = [];
  while(x) {
      digits.push(characters.int_to_char(x % 98))
      x = Math.floor(x /= 98);
  }
  digits.reverse();
  return digits.join("");
}

function to_base_196(x) {
  x = Math.abs(x);
  if(x == 0) {
    return characters.int_to_char(0);
  }
  var digits = [];
  while(x) {
      digits.push(characters.int_to_char(x % 196))
      x = Math.floor(x /= 196);
  }
  digits.reverse();
  return digits.join("");
}

function from_base_98(s) {
  var x = 0;
  for(var i = 0; i < s.length; ++i) {
    x += characters.char_to_int(s[s.length - i - 1]) * Math.pow(98, i);
  }
  return x;
}

function from_base_196(s) {
  var x = 0;
  for(var i = 0; i < s.length; ++i) {
    x += characters.char_to_int(s[s.length - i - 1]) * Math.pow(196, i);
  }
  return x;
}
