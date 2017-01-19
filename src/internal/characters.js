(function(global){

function handleBug(s) { return s[s.length-1] };
var int_to_char = [
  '\u00f0','\u00ac','\u00b6','\u00a4','\u0041','\u0042','\u0043','\u0044','\u0045','\u0046','\u0047','\u0048','\u0049','\u004a','\u004b','\u004c',
  '\u004d','\u004e','\u004f','\u0050','\u0051','\u0052','\u0053','\u0054','\u0055','\u0056','\u0057','\u0058','\u0059','\u005a','\u0061','\u0062',
  '\u0063','\u0064','\u0065','\u0066','\u0067','\u0068','\u0069','\u006a','\u006b','\u006c','\u006d','\u006e','\u006f','\u0070','\u0071','\u0072',
  '\u0073','\u0074','\u0075','\u0076','\u0077','\u0078','\u0079','\u007a','\u002e','\u0021','\u003f','\u002c','\u0030','\u0031','\u0032','\u0033',
  '\u0034','\u0035','\u0036','\u0037','\u0038','\u0039','\u003a','\u003b','\u0022','\u0027','\u005f','\u003c','\u003d','\u003e','\u002a','\u002b',
  '\u002d','\u002f','\u005c','\u0040','\u0023','\u0024','\u0025','\u0026','\u005e','\u007c','\u0028','\u0029','\u005b','\u005d','\u007b','\u007d',
  '\u0060','\u007e','\u1ea0','\u1e04','\u1e0c','\u1eb8','\u1e24','\u1eca','\u1e32','\u1e36','\u1e42','\u1e46','\u1ecc','\u1e5a','\u1e62','\u1e6c',
  '\u1ee4','\u1e7e','\u1e88','\u1ef4','\u1e92','\u0226','\u1e02','\u010a','\u1e0a','\u0116','\u1e1e','\u0120','\u1e22','\u0130','\u013f','\u1e40',
  '\u1e44','\u022e','\u1e56','\u1e58','\u1e60','\u1e6a','\u1e86','\u1e8a','\u1e8e','\u017b','\u1ea1','\u1e05','\u1e0d','\u1eb9','\u1e25','\u1ecb',
  '\u1e33','\u1e37','\u1e43','\u1e47','\u1ecd','\u1e5b','\u1e63','\u1e6d','\u1ee5','\u1e7f','\u1e89','\u1ef5','\u1e93','\u0227','\u1e03','\u010b',
  '\u1e0b','\u0117','\u1e1f','\u0121','\u1e23','\u0140','\u1e41','\u1e45','\u022f','\u1e57','\u1e59','\u1e61','\u1e6b','\u1e87','\u1e8b','\u1e8f',
  '\u017c','\u0181','\u0187','\u018a','\u0191','\u0193','\u0198','\u019d','\u01a4','\u01ac','\u01b2','\u0224','\u0253','\u0188','\u0257','\u0192',
  '\u0260','\u0266','\u0199','\u0271','\u0272','\u01a5','\u02a0','\u027c','\u0282','\u01ad','\u028b','\u0225','\u00c6','\u00c7','\u00d0','\u00d1',
  '\u00d8','\u0152','\u00de','\u00df','\u00e6','\u00e7','\u0131','\u0237','\u00f1','\u00f8','\u0153','\u00fe','\u20ac','\u00a2','\u00a3','\u00a5',
  '\u2026','\u00b5','\u00a1','\u00bf','\u00d7','\u00f7','\u00a6','\u00a9','\u00ae','\u00ab','\u00bb','\u2018','\u2019','\u201c','\u201d','\u00b0',
  '\u00b9','\u00b2','\u00b3','\u2074','\u2075','\u2076','\u2077','\u2078','\u2079','\u207a','\u207b','\u207c','\u207d','\u207e','\u0020','\u000a'
];

var char_to_int = {};
(function(){
  for(var i = 0; i < 256; ++i) {
    char_to_int[handleBug(int_to_char[i])] = i;
  }
})()

var regexified = [
  '\\u00f0','\\u00ac','\\u00b6','\\u00a4','\\u0041','\\u0042','\\u0043','\\u0044','\\u0045','\\u0046','\\u0047','\\u0048','\\u0049','\\u004a','\\u004b','\\u004c',
  '\\u004d','\\u004e','\\u004f','\\u0050','\\u0051','\\u0052','\\u0053','\\u0054','\\u0055','\\u0056','\\u0057','\\u0058','\\u0059','\\u005a','\\u0061','\\u0062',
  '\\u0063','\\u0064','\\u0065','\\u0066','\\u0067','\\u0068','\\u0069','\\u006a','\\u006b','\\u006c','\\u006d','\\u006e','\\u006f','\\u0070','\\u0071','\\u0072',
  '\\u0073','\\u0074','\\u0075','\\u0076','\\u0077','\\u0078','\\u0079','\\u007a','\\u002e','\\u0021','\\u003f','\\u002c','\\u0030','\\u0031','\\u0032','\\u0033',
  '\\u0034','\\u0035','\\u0036','\\u0037','\\u0038','\\u0039','\\u003a','\\u003b','\\u0022','\\u0027','\\u005f','\\u003c','\\u003d','\\u003e','\\u002a','\\u002b',
  '\\u002d','\\u002f','\\u005c','\\u0040','\\u0023','\\u0024','\\u0025','\\u0026','\\u005e','\\u007c','\\u0028','\\u0029','\\u005b','\\u005d','\\u007b','\\u007d',
  '\\u0060','\\u007e','\\u1ea0','\\u1e04','\\u1e0c','\\u1eb8','\\u1e24','\\u1eca','\\u1e32','\\u1e36','\\u1e42','\\u1e46','\\u1ecc','\\u1e5a','\\u1e62','\\u1e6c',
  '\\u1ee4','\\u1e7e','\\u1e88','\\u1ef4','\\u1e92','\\u0226','\\u1e02','\\u010a','\\u1e0a','\\u0116','\\u1e1e','\\u0120','\\u1e22','\\u0130','\\u013f','\\u1e40',
  '\\u1e44','\\u022e','\\u1e56','\\u1e58','\\u1e60','\\u1e6a','\\u1e86','\\u1e8a','\\u1e8e','\\u017b','\\u1ea1','\\u1e05','\\u1e0d','\\u1eb9','\\u1e25','\\u1ecb',
  '\\u1e33','\\u1e37','\\u1e43','\\u1e47','\\u1ecd','\\u1e5b','\\u1e63','\\u1e6d','\\u1ee5','\\u1e7f','\\u1e89','\\u1ef5','\\u1e93','\\u0227','\\u1e03','\\u010b',
  '\\u1e0b','\\u0117','\\u1e1f','\\u0121','\\u1e23','\\u0140','\\u1e41','\\u1e45','\\u022f','\\u1e57','\\u1e59','\\u1e61','\\u1e6b','\\u1e87','\\u1e8b','\\u1e8f',
  '\\u017c','\\u0181','\\u0187','\\u018a','\\u0191','\\u0193','\\u0198','\\u019d','\\u01a4','\\u01ac','\\u01b2','\\u0224','\\u0253','\\u0188','\\u0257','\\u0192',
  '\\u0260','\\u0266','\\u0199','\\u0271','\\u0272','\\u01a5','\\u02a0','\\u027c','\\u0282','\\u01ad','\\u028b','\\u0225','\\u00c6','\\u00c7','\\u00d0','\\u00d1',
  '\\u00d8','\\u0152','\\u00de','\\u00df','\\u00e6','\\u00e7','\\u0131','\\u0237','\\u00f1','\\u00f8','\\u0153','\\u00fe','\\u20ac','\\u00a2','\\u00a3','\\u00a5',
  '\\u2026','\\u00b5','\\u00a1','\\u00bf','\\u00d7','\\u00f7','\\u00a6','\\u00a9','\\u00ae','\\u00ab','\\u00bb','\\u2018','\\u2019','\\u201c','\\u201d','\\u00b0',
  '\\u00b9','\\u00b2','\\u00b3','\\u2074','\\u2075','\\u2076','\\u2077','\\u2078','\\u2079','\\u207a','\\u207b','\\u207c','\\u207d','\\u207e','\\u0020','\\u000a'
 ];
  
var characters = {};
characters.int_to_char = function(i) { return int_to_char[i]; };
characters.char_to_int = function(i) { return char_to_int[i]; };
characters.regex = {};
characters.chars = [];
(function(){
  for(var i = 0; i < 256; ++i) {
    characters.chars.push(characters.int_to_char(i));
  }
})()
characters.chars.regexified = regexified;
characters.chars.min = 0;
characters.chars.max = 255;
characters.chars.string = characters.chars.join("");

characters.printables = [];
characters.printables.regexified = [];
characters.printables.min = 0;
characters.printables.max = 97;
(function(){
  for(var i = characters.printables.min; i <= characters.printables.max; ++i) {
    characters.printables.push(characters.int_to_char(i));
    characters.printables.regexified.push(regexified[i]);
  }
})();
characters.printables.string = characters.printables.regexified.join("");
characters.regex.a_printable = "[" + characters.printables.string + "]";
characters.regex.not_a_printable = "[^" + characters.printables.string + "]";
characters.printables.is = function(c) {
  c = characters.char_to_int(c);
  return characters.printables.min <= c && c <= characters.printables.max;
};

characters.compressables = [];
characters.compressables.regexified = [];
characters.compressables.min = 0;
characters.compressables.max = 195;
(function(){
  for(var i = characters.compressables.min; i <= characters.compressables.max; ++i) {
    characters.compressables.push(characters.int_to_char(i));
    characters.compressables.regexified.push(regexified[i]);
  }
})();
characters.compressables.string = characters.compressables.regexified.join("");
characters.regex.a_compressable = "[" + characters.compressables.string + "]";
characters.regex.not_a_compressable = "[^" + characters.compressables.string + "]";
characters.compressables.is = function(c) {
  c = characters.char_to_int(c);
  return characters.compressables.min <= c && c <= characters.compressables.max;
};

characters.noncompressables = [];
characters.noncompressables.min = 196;
characters.noncompressables.max = 255;
(function(){
  for(var i = characters.noncompressables.min; i <= characters.noncompressables.max; ++i) {
    characters.noncompressables.push(characters.int_to_char(i));
  }
})();
characters.noncompressables.string = characters.noncompressables.join("");
characters.noncompressables.is = function(c) {
  c = characters.char_to_int(c);
  return characters.noncompressables.min <= c && c <= characters.noncompressables.max;
};

characters.tiny_digits = [characters.correct('°'),characters.correct('¹'),characters.correct('²'),
                          characters.correct('³'),characters.correct('⁴'),characters.correct('⁵'),
                          characters.correct('⁶'),characters.correct('⁷'),characters.correct('⁸'),
                          characters.correct('⁹')];
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
    res += characters.int_to_char(find(key, s[i]));
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
    decompressed += key[characters.char_to_int(res[i])];
  }
  
  return decompressed;
};
  
characters.compress_range = function(s) {
  var key = "", res = "";

  var max = 0, min = 97;
  
  for(var i = s.length; i--;) {
    var v = characters.char_to_int(s[i]);
    if(max < v) max = v;
    if(v < min) min = v;
  }
  
  // Now, offset each character based off of the min.
  for(var i = 0, l = s.length; i < l; ++i) {
    res += characters.int_to_char(characters.char_to_int(s[i]) - min);
  }
  
  var max_num_bits = (max - min).toString(2).length;
  
  res = characters.compress_bitpack(max_num_bits, res);
  
  var min_char = characters.bitify_char(characters.int_to_char(min));
  min_char.push(min_char.shift());
  var bits = characters.bitify_char(characters.int_to_char(max_num_bits));
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
    max_num_bits = characters.char_to_int(compressed[1]);
    compressed = compressed.slice(2, compressed.length);
  }
  min_char.unshift(min_char.pop());
  var min = parseInt(min_char.join(""), 2);
  
  compressed = characters.decompress_bitpack(max_num_bits, compressed);
  var decompressed = "";
  for(var i = 0, l = compressed.length; i < l; ++i) {
    decompressed += characters.int_to_char(characters.char_to_int(compressed[i]) + min);
  }
  return decompressed;
};
  
characters.regexified = regexified;
  
characters.correct = handleBug;  
  
global.characters = characters;

})(this)
