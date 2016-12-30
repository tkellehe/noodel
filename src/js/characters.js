(function(global){

function handleBug(s) { return s[s.length-1] };
var int_to_char = [
'ð','¬','¶','¤','A','B','C','D','E','F','G','H','I','J','K','L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b',
'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
's','t','u','v','w','x','y','z','.','!','?',',','0','1','2','3',
'4','5','6','7','8','9',':',';','"',"'",'_','<','=','>','*','+',
'-','/','\\','@','#','$','%','&','^','|','(',')','[',']','{','}',
'`','~','Ạ','Ḅ','Ḍ','Ẹ','Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ','Ṭ',
'Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ','Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ','Ṁ',
'Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ','Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ','ị',
'ḳ','ḷ','ṃ','ṇ','ọ','ṛ','ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ','ċ',
'ḋ','ė','ḟ','ġ','ḣ','ŀ','ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ','ẏ',
'ż','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ','Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ',
'ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ','ƭ','ʋ','ȥ','Æ','Ç','Ð','Ñ',
'Ø','Œ','Þ','ß','æ','ç','ı','ȷ','ñ','ø','œ','þ','€','¢','£','¥',
'…','µ','¡','¿','×','÷','¦','©','®','«','»','‘','’','“','”','°',
'¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','⁺','⁻','⁼','⁽','⁾',' ','\n'
];

var regexified = [
'ð','¬','¶','¤','A','B','C','D','E','F','G','H','I','J','K','L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b',
'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
's','t','u','v','w','x','y','z','\\.','!','\\?',',','0','1','2','3',
'4','5','6','7','8','9',':',';','"',"'",'_','<','=','>','\\*','\\+',
'-','\\/','\\\\','@','#','$','%','&','\\^','\\|','\\(','\\)','\\[','\\]','{','}',
'`','~','Ạ','Ḅ','Ḍ','Ẹ','Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ','Ṭ',
'Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ','Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ','Ṁ',
'Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ','Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ','ị',
'ḳ','ḷ','ṃ','ṇ','ọ','ṛ','ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ','ċ',
'ḋ','ė','ḟ','ġ','ḣ','ŀ','ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ','ẏ',
'ż','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ','Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ',
'ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ','ƭ','ʋ','ȥ','Æ','Ç','Ð','Ñ',
'Ø','Œ','Þ','ß','æ','ç','ı','ȷ','ñ','ø','œ','þ','€','¢','£','¥',
'…','µ','¡','¿','×','÷','¦','©','®','«','»','‘','’','“','”','°',
'¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','⁺','⁻','⁼','⁽','⁾',' ','\\n'
];

var char_to_int = {};

// Corrects for when browsers place characters in front of the actual and populates char_to_int.
(function(){
  for(var i = int_to_char.length; i--;) {
    int_to_char[i] = handleBug(int_to_char[i]);
    char_to_int[int_to_char[i]] = i;
  }
})();


var characters = {};
characters.regex = {};
characters.chars = int_to_char;
characters.chars.regexified = regexified;
characters.chars.min = 0;
characters.chars.max = 255;
characters.chars.string = int_to_char.join("");
characters.chars.is = function(c) { return characters.is_valid_char(c) }
characters.is_valid_code = function(i) { return characters.chars.min <= i && i <= characters.chars.max };
characters.is_valid_char = function(c) { return char_to_int[c] !== undefined };
characters.int_to_char = function(i) { return int_to_char[i] };
characters.char_to_int = function(c) { return char_to_int[c] };

characters.printables = [];
characters.printables.regexified = [];
characters.printables.min = 0;
characters.printables.max = 97;
(function(){
  for(var i = characters.printables.min; i <= characters.printables.max; ++i) {
    characters.printables.push(int_to_char[i]);
    characters.printables.regexified.push(regexified[i]);
  }
})();
characters.printables.string = characters.printables.regexified.join("");
characters.regex.a_printable = "[" + characters.printables.string + "]";
characters.regex.not_a_printable = "[^" + characters.printables.string + "]";
characters.printables.is = function(c) {
  c = char_to_int[c];
  return characters.printables.min <= c && c <= characters.printables.max;
};

characters.compressables = [];
characters.compressables.regexified = [];
characters.compressables.min = 0;
characters.compressables.max = 195;
(function(){
  for(var i = characters.compressables.min; i <= characters.compressables.max; ++i) {
    characters.compressables.push(int_to_char[i]);
    characters.compressables.regexified.push(regexified[i]);
  }
})();
characters.compressables.string = characters.compressables.regexified.join("");
characters.regex.a_compressable = "[" + characters.compressables.string + "]";
characters.regex.not_a_compressable = "[^" + characters.compressables.string + "]";
characters.compressables.is = function(c) {
  c = char_to_int[c];
  return characters.compressables.min <= c && c <= characters.compressables.max;
};

characters.noncompressables = [];
characters.noncompressables.min = 196;
characters.noncompressables.max = 255;
(function(){
  for(var i = characters.noncompressables.min; i <= characters.noncompressables.max; ++i) {
    characters.noncompressables.push(int_to_char[i]);
  }
})();
characters.noncompressables.string = characters.noncompressables.join("");
characters.noncompressables.is = function(c) {
  c = char_to_int[c];
  return characters.noncompressables.min <= c && c <= characters.noncompressables.max;
};

characters.tiny_digits = [handleBug('°'),handleBug('¹'),handleBug('²'),
                          handleBug('³'),handleBug('⁴'),handleBug('⁵'),
                          handleBug('⁶'),handleBug('⁷'),handleBug('⁸'),handleBug('⁹')];
characters.tiny_digits.string = characters.tiny_digits.join("");
characters.regex.a_tiny_digit = "[" + characters.tiny_digits.string + "]";
characters.regex.not_a_tiny_digit = "[^" + characters.tiny_digits.string + "]";
characters.tiny_digits.is = function(c) {
  for(var i = characters.tiny_digits.length; i--;) {
    if(characters.tiny_digits[i] === c) return true;
  }
  return false;
};
var tiny_digit_to_digit = {},
    digit_to_tiny_digit = {};
(function(){
  for(var i = characters.tiny_digits.length; i--;) {
    tiny_digit_to_digit[characters.tiny_digits[i]] = i+"";
    digit_to_tiny_digit[i+""] = characters.tiny_digits[i];
  }
})()
characters.tiny_num_to_num = function(s) {
  var r = "";
  for(var i = 0, l = s.length; i < l; ++i) {
    r += tiny_digit_to_digit[s[i]];
  }
  return r;
};
characters.num_to_tiny_num = function(s) {
  s = s+"";
  var r = "";
  for(var i = 0, l = s.length; i < l; ++i) {
    r += digit_to_tiny_digit[s[i]];
  }
  return r;
};

characters.printify_char = function(c) {
  if(c === characters.correct("¶")) return "\n";
  if(c === characters.correct("¤")) return " ";
  return c;
};

function handleUnicode(s) {
  return s.replace(/:,(\d+);/g, function(c,n) { return String.fromCharCode(+n); });
};
  
characters.printify_string = function(s) {
  var r = "";
  for(var i = 0; i < s.length; ++i) r += characters.printify_char(s[i]);
  // Lastly need to handle unicode.
  return handleUnicode(r);
};
  
characters.deprintify_char = function(c) {
  // Handles unicode characters.
  if(!characters.printables.is(c)) {
    return ":," + c.charCodeAt(0) + ";";
  }
  if(c === "\n") characters.correct("¶");
  if(c === " ") characters.correct("¤");
  return c;
};
  
characters.deprintify_string = function(s) {
  var r = "";
  for(var i = 0; i < s.length; ++i) r += characters.deprintify_char(s[i]);
  return r;
};
  
characters.bitify_char = function(c) {
  var a = [], v = characters.char_to_int(c).toString(2);
  while(v.length < 8) v = "0" + v;
  for(var i = v.length; i--;) a.unshift(+v[i]);
  return a;
};
  
characters.bitify_string = function(s) {
  var a = [];
  for(var i = 0, l = s.length; i < l; ++i) {
    a = a.concat(characters.bitify_char(s[i]));
  }
  return a;
};

characters.debitify_char = function(a) {
  return characters.int_to_char(parseInt(a.join(""), 2));
};
  
characters.debitify_string = function(a) {
  var s = "";
  for(var i = 0, l = a.length; i < l; i += 8) {
    s += characters.debitify_char(a.slice(i, i+8));
  }
  return s;
};
  
characters.compress_basic = function(s) {
  var a = [];
  // Every 9th character will get compressed into the previous 7 characters where the 1st
  // gets a bit set indicating that the next eight have a character hidden within.
  for(var i = 0; i < s.length; ++i) {
    // Gets the character in bit form.
    var bits = characters.bitify_char(s[i]);
    
    // If the 9th character compress, else do normal left shifting.
    if((i + 1) % 9) {
      // Left shift the bits moving the left most to the right most.
      // This allows for only the compressable characters to be used in the string.
      bits.push(bits.shift());
      a = a.concat(bits);
    } else {
      // We only need the last seven bits because the largest value is 97.
      bits.shift();
      // Tells that there is a character compressed in the next 7 characters.
      a[(i - 8) * 8 + 7] = 1;
      for(var j = (i - 7) * 8, k = 0, l = (i - 1) * 8; j <= l; j+=8) {
        // Places the bits into the unused bits of the next 7 characters.
        a[j + 7] = bits[k++];
      }
    }
  }
  return characters.debitify_string(a);
};
  
characters.decompress_basic = function(s) {
  var bits = characters.bitify_string(s), r = "";
  for(var i = 0; i < bits.length;) {
    if(bits[i+7] === 1) {
      var first = bits.slice(i, i+8);
      // Correct all of the bits.
      first.pop();
      first.unshift(0);
      r += characters.debitify_char(first);
      i += 8;
      // Figure out the compressed character and decode the others.
      var compressed = [];
      for(var j = 7; j--;) {
        var c = bits.slice(i, i+8);
        compressed.push(c.pop());
        // Correct the bit shift.
        c.unshift(0);
        r += characters.debitify_char(c);
        // Jump to the start of the next character.
        i += 8;
      }
      compressed.unshift(0);
      r += characters.debitify_char(compressed);
    } else {
      // Easiest case.
      for(var j = 8; j-- && i < bits.length;) {
        var c = bits.slice(i, i+8);
        // Correct the bit shift.
        c.unshift(c.pop());
        r += characters.debitify_char(c);
        // Jump to the start of the next character.
        i += 8;
      }
    }
  }
  return r;
};

characters.compress_occur = function(s) {
  var key = "", res = "";
  
  function find(s, c) { for(var i = s.length; i--;) if(s[i] === c) return i; return -1; }
  
  // First get all of the characters for the key.
  for(var i = s.length; i--;) {
    if(find(key, s[i]) === -1) key += s[i];
  }
  
  // Now, can assign each character an index based off of the key.
  for(var i = 0, l = s.length; i < l; ++i) {
    // Since there are only 98 printable characters we know that the biggest index will be 97.
    res += int_to_char[find(key, s[i])];
  }
  
  // The result is now made up of the indexes, but we have not actually compressed this depends on the bits.
  var max_num_bits = (key.length - 1).toString(2).length, compressed = "";
  
  // If the bits is 7 then the best can do is the basic compression.
  if(max_num_bits === 7) {
    compressed = characters.compress_basic(res);
  } else if(max_num_bits === 6) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if((i+1)%(8)) {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      } else {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 6 chars hold another char.
        all_bits[((i-7)*8) + 1] = 1;
        all_bits[((i-6)*8) + 1] = bits[2];
        all_bits[((i-5)*8) + 1] = bits[3];
        all_bits[((i-4)*8) + 1] = bits[4];
        all_bits[((i-3)*8) + 1] = bits[5];
        all_bits[((i-2)*8) + 1] = bits[6];
        all_bits[((i-1)*8) + 1] = bits[7];
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  } else if(max_num_bits === 5) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if(!((i+1)%7)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 5 chars hold another char.
        all_bits[((i-6)*8) + 1] = 1;
        all_bits[((i-5)*8) + 1] = bits[3];
        all_bits[((i-4)*8) + 1] = bits[4];
        all_bits[((i-3)*8) + 1] = bits[5];
        all_bits[((i-2)*8) + 1] = bits[6];
        all_bits[((i-1)*8) + 1] = bits[7];
      } else if(!((i+2)%7)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 5 chars hold another char.
        all_bits[((i-7)*8) + 2] = 1;
        all_bits[((i-6)*8) + 2] = bits[3];
        all_bits[((i-5)*8) + 2] = bits[4];
        all_bits[((i-4)*8) + 2] = bits[5];
        all_bits[((i-3)*8) + 2] = bits[6];
        all_bits[((i-2)*8) + 2] = bits[7];
      } else {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  } else if(max_num_bits === 4) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if(!((i+1)%6)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 4 chars hold another char.
        all_bits[((i-5)*8) + 1] = 1;
        all_bits[((i-4)*8) + 1] = bits[4];
        all_bits[((i-3)*8) + 1] = bits[5];
        all_bits[((i-2)*8) + 1] = bits[6];
        all_bits[((i-1)*8) + 1] = bits[7];
      } else if(!((i+2)%6)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 4 chars hold another char.
        all_bits[((i-6)*8) + 2] = 1;
        all_bits[((i-5)*8) + 2] = bits[4];
        all_bits[((i-4)*8) + 2] = bits[5];
        all_bits[((i-3)*8) + 2] = bits[6];
        all_bits[((i-2)*8) + 2] = bits[7];
      } else if(!((i+3)%6)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 4 chars hold another char.
        all_bits[((i-7)*8) + 3] = 1;
        all_bits[((i-6)*8) + 3] = bits[4];
        all_bits[((i-5)*8) + 3] = bits[5];
        all_bits[((i-4)*8) + 3] = bits[6];
        all_bits[((i-3)*8) + 3] = bits[7];
      } else {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  } else if(max_num_bits === 3) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if(!((i+1)%5)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 3 chars hold another char.
        all_bits[((i-4)*8) + 1] = 1;
        all_bits[((i-3)*8) + 1] = bits[5];
        all_bits[((i-2)*8) + 1] = bits[6];
        all_bits[((i-1)*8) + 1] = bits[7];
      } else if(!((i+2)%5)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 3 chars hold another char.
        all_bits[((i-5)*8) + 2] = 1;
        all_bits[((i-4)*8) + 2] = bits[5];
        all_bits[((i-3)*8) + 2] = bits[6];
        all_bits[((i-2)*8) + 2] = bits[7];
      } else if(!((i+3)%5)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 3 chars hold another char.
        all_bits[((i-6)*8) + 3] = 1;
        all_bits[((i-5)*8) + 3] = bits[5];
        all_bits[((i-4)*8) + 3] = bits[6];
        all_bits[((i-3)*8) + 3] = bits[7];
      } else if(!((i+4)%5)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 3 chars hold another char.
        all_bits[((i-7)*8) + 4] = 1;
        all_bits[((i-6)*8) + 4] = bits[5];
        all_bits[((i-5)*8) + 4] = bits[6];
        all_bits[((i-4)*8) + 4] = bits[7];
      } else {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  } else if(max_num_bits === 2) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if(!((i+1)%4)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 2 chars hold another char.
        all_bits[((i-3)*8) + 1] = 1;
        all_bits[((i-2)*8) + 1] = bits[6];
        all_bits[((i-1)*8) + 1] = bits[7];
      } else if(!((i+2)%4)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 2 chars hold another char.
        all_bits[((i-4)*8) + 2] = 1;
        all_bits[((i-3)*8) + 2] = bits[6];
        all_bits[((i-2)*8) + 2] = bits[7];
      } else if(!((i+3)%4)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 2 chars hold another char.
        all_bits[((i-5)*8) + 3] = 1;
        all_bits[((i-4)*8) + 3] = bits[6];
        all_bits[((i-3)*8) + 3] = bits[7];
      } else if(!((i+4)%4)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 2 chars hold another char.
        all_bits[((i-6)*8) + 4] = 1;
        all_bits[((i-5)*8) + 4] = bits[6];
        all_bits[((i-4)*8) + 4] = bits[7];
      } else if(!((i+5)%4)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 2 chars hold another char.
        all_bits[((i-7)*8) + 5] = 1;
        all_bits[((i-6)*8) + 5] = bits[6];
        all_bits[((i-5)*8) + 5] = bits[7];
      } else {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  } else if(max_num_bits === 1) {
    var all_bits = [];
    for(var i = 0; i < res.length; ++i) {
      if(!((i+6)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-2)*8) + 1] = 1;
        all_bits[((i-1)*8) + 1] = bits[7];
      } else if(!((i+5)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-3)*8) + 2] = 1;
        all_bits[((i-2)*8) + 2] = bits[7];
      } else if(!((i+4)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-4)*8) + 3] = 1;
        all_bits[((i-3)*8) + 3] = bits[7];
      } else if(!((i+3)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-5)*8) + 4] = 1;
        all_bits[((i-4)*8) + 4] = bits[7];
      } else if(!((i+2)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-6)*8) + 5] = 1;
        all_bits[((i-5)*8) + 5] = bits[7];
      } else if(!((i+1)%8)) {
        // Get the bits of the character to be compressed.
        var bits = characters.bitify_char(res[i]);
        // Indicate that the next 1 chars hold another char.
        all_bits[((i-7)*8) + 6] = 1;
        all_bits[((i-6)*8) + 6] = bits[7];
      } else {
        // Normal case just add the bits.
        all_bits = all_bits.concat(characters.bitify_char(res[i]));
      }
    }
    
    compressed = characters.debitify_string(all_bits);
  }
  
  return { key: characters.compress_basic(key), compressed: compressed };
};

characters.decompress_occur = function(key, compressed) {
  var res = "";
  key = characters.decompress_basic(key);
  
  var num_bits_added = char_to_int[key[0]];
  key = key.slice(1, key.length);
  
  var max_num_bits = (key.length - 1).toString(2).length;
  if(max_num_bits < 7) max_num_bits++;
  var bits = characters.bitify_string(compressed), res = "";
  
  for(var i = 0, l = bits.length - num_bits_added; i < l; i += max_num_bits) {
    var t = bits.slice(i, i+max_num_bits);
    if(t.length === max_num_bits) res += characters.debitify_char(t);
  }
  
  var decompressed = "";
  
  for(var i = 0, l = res.length; i < l; ++i) {
    decompressed += key[char_to_int[res[i]]];
  }
  
  return decompressed;
};
  
characters.correct = handleBug;
  
global.characters = characters;

})(this)
