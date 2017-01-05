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
  return s.replace(/\%([0-9A-F])/g, function(c,n) { return String.fromCharCode(parseInt(n, 16)); });
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
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
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
characters.compress_basic = function(s) {
  var a = [], packed_count = 0;
  // Every 9th character will get compressed into the previous 7 characters where the 1st
  // gets a bit set indicating that the next seven have a character hidden within.
  for(var i = 0; i < s.length; ++i) {
    // Gets the character in bit form.
    var bits = characters.bitify_char(s[i]);
    
    // If the 9th character compress, else do normal left shifting.
    if((i+1)%9 !== 0) {
      // Rotate the bits (place a zero in the back).
      // This allows for only the compressable characters to be used in the string.
      bits.push(bits.shift());
      a = a.concat(bits);
    } else {
      // We only need the last seven bits because the largest value is 97.
      bits.shift();
      // Tells that there is a character compressed in the next 7 characters.
      a[(i - 8 - packed_count) * 8 + 7] = 1;
      for(var j = (i - 7 - packed_count) * 8, k = 0, l = (i - 1 - packed_count) * 8; j <= l; j+=8) {
        // Places the bits into the unused bits of the next 7 characters.
        a[j + 7] = bits[k++];
      }
      ++packed_count;
    }
  }
  return characters.debitify_string(a);
};
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

characters.compress_bitpack = function(N, string) {
  // If it requires 7 bits to encode each character in the string, the best compression is the basic one.
  if(N === 7) return characters.compress_basic(string);
  
  var all_bits = [], packed_index = 0;
  for(var i = 0; i < string.length; ++i) {
    // Get the character in its bit format.
    var bits = characters.bitify_char(string[i]),
    // Used to determine whether or not the character must be packed into the previous N+1 characters.
        is_compressed = false;
    
    // 7 - N characters can be packed into the previous N+1 characters.
    var j = 7 - N;
    while(0 < j) {
      // If the current position is properly divisable by eight given offset j, then it can be packed.
      if((i+j)%8 === 0) {
        is_compressed = true;
        break;
      };
      // Move j.
      j--;
    }
    
    if(is_compressed) {
      // The offset into which bit holds the data in the characters being packed into.
      var offset = 8 - j - N;
      // Indicate that the next N characters hold a packed character.
      all_bits[((packed_index - N - 1)*8) + offset] = 1;
      // Loop through each of the bits in the character to be packed.
      for(var k = N; 0 < k; --k) {
        // Places the bits into the correct location.
        all_bits[((packed_index - k)*8) + offset] = bits[8 - k];
      }
    } else {
      // No packing required, therein just append on the bits.
      all_bits = all_bits.concat(bits);
      // Increment the packed_index, beause added a new character that can hold characters.
      packed_index++;
    }
  }
    
  // Can now turn the bits into actual characters.
  return characters.debitify_string(all_bits);
};
  
characters.decompress_bitpack = function(N, compressed) {
  // If N is 7, then just use the basic decompession.
  if(N === 7) return characters.decompress_basic(compressed);
  
  var all_bits = characters.bitify_string(compressed), res = "";
  
  // Loop through each 8bit chunk in order to look at each character to find the packed characters.
  for(var i = 0; i < all_bits.length; i += 8) {

    // Grab the bits that we know holds a valid character.
    var packed_bits = all_bits.slice(i + (8 - N), i + 8);
    
    // Fill it with zeros.
    for(var c = 8 - N; c--;) packed_bits.unshift(0);
    res += characters.debitify_char(packed_bits);

    // If on the last character that could be holding a packed character.
    if(((i/8)+1)%(N+1) === 0) {
      // Loop back through each character that hold a packed character and get all of the characters packed.
      for(var k = 1; k < (8 - N); ++k) {
        var bits = [], offset = i - (N*8);
        // If the flag bit is set, then the next N characters hold a packed character.
        if(all_bits[offset+k] === 1) {
          // Fill it with zeros.
          for(var c = 8 - N; c--;) bits.push(0);
          // Get the packed bits.
          for(var j = 0; j < N; ++j) {
            bits.push(all_bits[offset+k+((j+1)*8)]);
          }
          res += characters.debitify_char(bits);
        } else {
          // Can exit because no others should be one.
          break;
        }
      }
    }
  }
  return res;
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
  var max_num_bits = (key.length - 1).toString(2).length;
  
  return { key: characters.compress_basic(key), compressed: characters.compress_bitpack(max_num_bits, res) };
};

characters.decompress_occur = function(key, compressed) {
  key = characters.decompress_basic(key);
  
  var max_num_bits = (key.length - 1).toString(2).length,
      res = characters.decompress_bitpack(max_num_bits, compressed);
  
  var decompressed = "";
  
  for(var i = 0, l = res.length; i < l; ++i) {
    decompressed += key[char_to_int[res[i]]];
  }
  
  return decompressed;
};
  
characters.compress_range = function(s) {
  var key = "", res = "";

  var max = 0, min = 97;
  
  for(var i = s.length; i--;) {
    var v = char_to_int[s[i]];
    if(max < v) max = v;
    if(v < min) min = v;
  }
  
  // Now, offset each character based off of the min.
  for(var i = 0, l = s.length; i < l; ++i) {
    res += int_to_char[char_to_int[s[i]] - min];
  }
  
  var max_num_bits = (max - min).toString(2).length;
  
  res = characters.compress_bitpack(max_num_bits, res);
  
  var min_char = characters.bitify_char(int_to_char[min]);
  min_char.push(min_char.shift());
  var bits = characters.bitify_char(int_to_char[max_num_bits]);
  if(min < 8) {
    min_char[7] = 1;
    min_char[1] = bits[5];
    min_char[2] = bits[6];
    min_char[3] = bits[7];
  } else {
    min_char = min_char.concat(bits);
  }
  
  key = characters.debitify_string(min_char);
  
  return key + res;
};
  
characters.decompress_range = function(compressed) {
  var min_char = characters.bitify_char(compressed[0]), max_num_bits;
  
  if(min_char[7] === 1) {
    max_num_bits = parseInt((min_char.slice(1, 4)).join(""), 2);
    min_char[7] = 0;
    min_char[1] = 0;
    min_char[2] = 0;
    min_char[3] = 0;
    compressed = compressed.slice(1, compressed.length);
  } else {
    max_num_bits = char_to_int[compressed[1]];
    compressed = compressed.slice(2, compressed.length);
  }
  min_char.unshift(min_char.pop());
  var min = parseInt(min_char.join(""), 2);
  
  compressed = characters.decompress_bitpack(max_num_bits, compressed);
  var decompressed = "";
  for(var i = 0, l = compressed.length; i < l; ++i) {
    decompressed += int_to_char[char_to_int[compressed[i]] + min];
  }
  return decompressed;
};
  
characters.correct = handleBug;
  
global.characters = characters;

})(this)
