//------------------------------------------------------------------------------------------------------------
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
};

//------------------------------------------------------------------------------------------------------------
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
};

//------------------------------------------------------------------------------------------------------------
function from_base_98(s) {
  var x = 0;
  for(var i = 0; i < s.length; ++i) {
    x += characters.char_to_int(s[s.length - i - 1]) * Math.pow(98, i);
  }
  return x;
};

//------------------------------------------------------------------------------------------------------------
function from_base_196(s) {
  var x = 0;
  for(var i = 0; i < s.length; ++i) {
    x += characters.char_to_int(s[s.length - i - 1]) * Math.pow(196, i);
  }
  return x;
};

//------------------------------------------------------------------------------------------------------------
var base = {};

base.b98_add_table = {};
(function(){
  for(var i = 0; i < 98; ++i) {
    var char = characters.int_to_char(i);
    base.b98_add_table[char] = {};
    for(var j = 0; j < 98; ++j) {
      var term = characters.int_to_char(j);
      base.b98_add_table[char][term] = {carry:undefined};
      var sum;
      if(i+j < 98) {
        sum = characters.int_to_char(i+j);
        base.b98_add_table[char][term].result = sum;
      } else {
        sum = characters.int_to_char(i+j-98);
        base.b98_add_table[char][term].carry = characters.int_to_char(1);
        base.b98_add_table[char][term].result = base.b98_add_table[char][term].carry + sum;
      }
      base.b98_add_table[char][term].sum = sum;
    }
  }
})();

base.b196_add_table = {};
(function(){
  for(var i = 0; i < 196; ++i) {
    var char = characters.int_to_char(i);
    base.b196_add_table[char] = {};
    for(var j = 0; j < 196; ++j) {
      var term = characters.int_to_char(j);
      base.b196_add_table[char][term] = {carry:undefined};
      var sum;
      if(i+j < 196) {
        sum = characters.int_to_char(i+j);
        base.b196_add_table[char][term].result = sum;
      } else {
        sum = characters.int_to_char(i+j-196);
        base.b196_add_table[char][term].carry = characters.int_to_char(1);
        base.b196_add_table[char][term].result = base.b196_add_table[char][term].carry + sum;
      }
      base.b196_add_table[char][term].sum = sum;
    }
  }
})();

//------------------------------------------------------------------------------------------------------------
// Might have to have a smarter functions to handle recursion of the algorithm a lot better...
base.b98_add = function(lhs, rhs) {
  if(lhs.length === 0) lhs = characters.int_to_char(0);
  if(rhs.length === 0) rhs = characters.int_to_char(0);
  
  if(lhs.length === 1 && rhs.length === 1) {
    var obj = base.b98_add_table[lhs][rhs];
    return obj.carry + obj.sum;
  }
  
  // Make lhs and rhs have the same length.
  if(lhs.length < rhs.length) {
    for(var i = rhs.length - lhs.length; i--;) {
      lhs = characters.int_to_char(0) + lhs;
    }
  } else if(rhs.length < lhs.length) {
    for(var i = lhs.length - rhs.length; i--;) {
      rhs = characters.int_to_char(0) + rhs;
    }
  }
  
  var result = "";
  
  for(var i = lhs.length; i--;) {
    var sum = base.b98_add(lhs[i], rhs[i]);
    // No carry occured.
    if(sum.length === 1) {
      result = sum + result;
    } else {
      result = sum[1] + result;
    }
  }
  
  return result;
};
