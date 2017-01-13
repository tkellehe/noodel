;(function(global){

function Pipe() {
  var self = this;
  self.__array__ = [];
  self.front = function(v) {
    if(arguments.length === 0) return self.front.pop();
    self.front.push(v);
    return self;
  }
  self.front.push = function(v) {
    self.__array__.unshift(v);
    return self;
  }
  self.front.pop = function() {
    return self.__array__.shift();
  }
  
  self.back = function(v) {
    if(arguments.length === 0) return self.back.pop();
    self.back.push(v);
    return self;
  }
  self.back.push = function(v) {
    self.__array__.push(v);
    return self;
  }
  self.back.pop = function() {
    return self.__array__.pop();
  }
}

Pipe.prototype.length = function() {
  return this.__array__.length;
}

Pipe.prototype.first = function() {
  return this.__array__[0];
}

Pipe.prototype.last = function() {
  return this.__array__[this.length() - 1];
}

Pipe.prototype.pipe = function(other) {
  while(other.length()) this.back(other.front());
  return this;
}

Pipe.prototype.rpipe = function(other) {
  while(other.length()) this.front(other.back());
  return this;
}

Pipe.prototype.at = function(i, v) {
  if(arguments.length === 1) {
    return this.__array__[i];
  } else if(arguments.length === 2 && 0 <= i && i < this.length()) {
    this.__array__[i] = v;
    return this;
  }
}

Pipe.prototype.each = function(f) {
  var r = undefined;
  for(var i = 0, l = this.length(); i < l && (r === undefined || (typeof r === "boolean" && r)); ++i)
    r = f.call(this, this.at(i));
  return this;
}

Pipe.prototype.reverse = function() {
  for(var i = 0, l = this.length(); i < l; ++i)
    this.front(this.back());
  return this;
}

Pipe.prototype.wipe = function() {
  while(this.front());
  return this;
}

Pipe.prototype.remove = function(v) {
  for(var i = 0, l = this.length(); i < l; ++i)
    if(v === this.__array__[i]) {
      this.__array__.splice(i, 1);
      return true;
    }
  return false;
}

global.Pipe = Pipe;

})(this)
;;(function(global){

function Props() {
  function the_props(name, value) {
    if(arguments.length === 1) return the_props.__props__[name]
    the_props.__props__[name] = value;
    return the_props;
  }
  the_props.__props__ = {};
  the_props.clear = function() { the_props.__props__ = {}; return the_props };
  the_props.get = function(name) { return the_props.__props__[name] };
  the_props.set = function(name, value) { the_props.__props__[name] = value; return the_props; };
  return the_props;
}

global.make_props = Props;

})(this)
;;(function(global){

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
  return s.replace(/\%([0-9A-F]+)/g, function(c,n) { return String.fromCharCode(parseInt(n, 16)); });
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
  
characters.regexified = regexified;
  
characters.correct = handleBug;  
  
global.characters = characters;

})(this)
;;function factorize_number(num) {
  var half = Math.floor(num / 2),
      array = [1],
      i, j;

  // Determine our increment value for the loop and starting point.
  num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

  for (; i <= half; i += j) {
    if(num % i === 0) array.push(i);
  }

  array.push(num);
  return array;
}

//------------------------------------------------------------------------------------------------------------
function NUMBER(v) {
  this.props = make_props();
  v = +v;
  this.value = v === v ? v : 0;
}

NUMBER.numerical_eval = function(o) {
  if(o.type === "NUMBER") {
    var x = Math.abs(o.value);
    if(x == 0) {
      return new STRING(characters.int_to_char(0));
    }

    var digits = [];

    while(x) {
        digits.push(characters.int_to_char(x % 98))
        x = Math.floor(x /= 98);
    }

    digits.reverse();

    return new STRING(digits.join(""));
  } 
  if(o.type === "STRING") {
    var x = 0;
    for(var i = 0; i < o.length(); ++i) {
      x += characters.char_to_int(o.value[o.length() - i - 1]) * Math.pow(98, i);
    }
    return new NUMBER(x);
  } 
  if(o.type === "ARRAY") {
    for(var i = 0; i < o.length(); ++i) {
      o.value[i] = NUMBER.numerical_eval(o.value[i]);
    }
    return o;
  }
}

NUMBER.numerical_eval_numbers = function(o) {
  if(o.type === "NUMBER") return o;
  if(o.type === "STRING") return NUMBER.numerical_eval(o);
  if(o.type === "ARRAY") {
    for(var i = 0; i < o.length(); ++i) {
      o.value[i] = NUMBER.numerical_eval_numbers(o.value[i]);
    }
    return o;
  }
}

NUMBER.prototype.type = "NUMBER";

NUMBER.prototype.toString = function() {
  return this.value+"";
}

NUMBER.prototype.copy = function() {
  return new NUMBER(this.value);
}

/// Conversions
NUMBER.prototype.valueify = function() {
  return this.value;
}
NUMBER.prototype.stringify = function() {
  return new STRING(this.value+"");
}
NUMBER.prototype.arrayify = function() {
  return new ARRAY([this.copy()]);
}
NUMBER.prototype.numberify = function() {
  return this.copy();
}
NUMBER.prototype.integerify = function() {
  return new NUMBER(Math.floor(this.value));
}
NUMBER.prototype.printify = function() {
  return this.toString();
}

/// Operators
NUMBER.prototype.increment = function(path) {
  return new NUMBER(this.value + 1);
}

NUMBER.prototype.decrement = function(path) {
  return new NUMBER(this.value - 1);
}

NUMBER.prototype.increment_flip = function(path) {
  return new NUMBER(1 + this.value);
}

NUMBER.prototype.decrement_flip = function(path) {
  return new NUMBER(1 - this.value);
}

NUMBER.prototype.add = function(rhs) {
  var v = rhs.numberify().value;
  return new NUMBER(this.value + v);
}

NUMBER.prototype.sub = function(rhs) {
  var v = rhs.numberify().value;
  return new NUMBER(this.value - v);
}

NUMBER.prototype.add_flip = function(lhs) {
  var v = lhs.numberify().value;
  return new NUMBER(v + this.value);
}

NUMBER.prototype.sub_flip = function(lhs) {
  var v = lhs.numberify().value;
  return new NUMBER(v - this.value);
}

/// Misc.

NUMBER.prototype.to_lowercase = function() {
  return new NUMBER(Math.floor(this.value));
}

NUMBER.prototype.to_uppercase = function() {
  return new NUMBER(Math.ceil(this.value));
}

NUMBER.prototype.to_switchcase = function() {
  return new NUMBER(Math.round(this.value));
}

NUMBER.prototype.is_truthy = function() {
  return new NUMBER(this.value ? 1 : 0);
}

NUMBER.prototype.is_falsy = function() {
  return new NUMBER(this.value ? 0 : 1);
}

NUMBER.prototype.relocate = function(from, to) {
  var string = this.value + "";
  var s = string[from];
  var slice = string.slice(0, from) + string.slice(from+1, string.length);
  slice = slice.slice(0, to) + s + slice.slice(to, slice.length);
  return new NUMBER(+slice);
}
;;//------------------------------------------------------------------------------------------------------------
function string_null_break(string) {
  return string.split(characters.correct("ð"));
};

function string_break(string) {
  var s = string_null_break(string);
  if(s.length === 1) {
    s = string.split("");
  }
  return s;
};

function STRING(v) {
  this.props = make_props();
  this.value = v === undefined ? "" : (v+"");
}

STRING.prototype.type = "STRING";

(function(){
  STRING.formats = [];
  function format(str) {
    var string = "", end = 0, res = "", add = "", temp;
    while(end < str.length) {
      for(var c = end; c < str.length; ++c) {
        string += str[c];
        for(var i = 0; i < STRING.formats.length; ++i) {
          temp = STRING.formats[i].call(this, string);
          if(temp !== undefined) {
            add = temp;
          }
        }
      }
      end += add.length;
      string = "";
      res += add;
    }
    return res;
  };
  STRING.prototype.format = format;
  Object.defineProperty(STRING, "format", {
    get: function() { return STRING.formats },
    set: function(v) { STRING.formats.push(v) },
    enumberable: true
  });
  STRING.format = function(str) {
    if(str.length === 1) return str;
  }
})()

STRING.prototype.toString = function() {
  return this.value;
}

STRING.prototype.copy = function() {
  return new STRING(this.value);
}

/// Conversions
STRING.prototype.valueify = function() {
  return this.value;
}
STRING.prototype.stringify = function() {
  return this.copy();
}
STRING.prototype.arrayify = function() {
  var a = string_break(this.value);
  for(var i = 0; i < a.length; ++i) a[i] = new STRING(a[i]);
  return new ARRAY(a);
}
STRING.prototype.numberify = function() {
  var temp = +this.value;
  if(temp !== temp) {
    return NUMBER.numerical_eval(this);
  }
  return new NUMBER(temp);
}
STRING.prototype.integerify = function() {
  return (this.numberify()).integerify();
}
STRING.prototype.printify = function() {
  return this.format(characters.printify_string(this.value));
}

/// Operators
STRING.prototype.increment = function(path) {
  var s = "", f = path.top();
  if(f) {
    s = f.stringify();
  }
  return new STRING(this.value + s);
}

STRING.prototype.decrement = function(path) {
  var s = this.value.slice(0, 1);
  path.top(new STRING(s));
  return new STRING(this.value.slice(1, this.value.length));
}

STRING.prototype.increment_flip = function(path) {
  var s = "", f = path.top();
  if(f) {
    s = f.stringify();
  }
  return new STRING(s + this.value);
}

STRING.prototype.decrement_flip = function(path) {
  var s = this.value.slice(this.value.length-1, this.value.length);
  path.top(new STRING(s));
  return new STRING(this.value.slice(0, this.value.length-1));
}

STRING.prototype.add = function(rhs) {
  var v = rhs.stringify().value;
  return new STRING(this.value + v);
}

STRING.prototype.sub = function(rhs) {
  var v = rhs.stringify().value;
  return new STRING(this.value.replace(v, ""));
}

STRING.prototype.add_flip = function(lhs) {
  var v = lhs.stringify().value;
  return new STRING(v + this.value);
}

STRING.prototype.sub_flip = function(lhs) {
  var v = lhs.stringify().value;
  return new STRING(v.replace(this.value, ""));
}

/// Array specific commands.
STRING.prototype.correct_index = function(index) {
  // Overkill for what it is actually doing...
  return ((index % this.length()) + this.length()) % this.length();
};


STRING.prototype.access = function(index) {
  return new STRING(this.value[this.correct_index(index)]);
};

STRING.prototype.length = function() {
  return this.value.length;
};

/// Misc.

STRING.prototype.to_lowercase = function() {
  return new STRING(this.value.toLowerCase());
}

STRING.prototype.to_uppercase = function() {
  return new STRING(this.value.toUpperCase());
}

STRING.prototype.switchcase = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) {
    var t = this.value[i];
    t = t.toLowerCase();
    if(t === this.value[i]) t = t.toUpperCase();
    s += t;
  }
  return new STRING(s);
}

STRING.prototype.is_truthy = function() {
  return new NUMBER(this.length() ? 1 : 0);
}

STRING.prototype.is_falsy = function() {
  return new NUMBER(this.length() ? 0 : 1);
}

STRING.prototype.relocate = function(from, to) {
  var s = this.value[from];
  var slice = this.value.slice(0, from) + this.value.slice(from+1, this.value.length);
  slice = slice.slice(0, to) + s + slice.slice(to, slice.length);
  return new STRING(slice);
}
;;//------------------------------------------------------------------------------------------------------------
function ARRAY(v) {
  this.props = make_props();
  this.value = v === undefined ? [] : v;
}

ARRAY.prototype.type = "ARRAY";

ARRAY.prototype.toString = function() {
  return this.stringify().toString();
}

ARRAY.prototype.copy = function() {
  return this;
}

/// Conversions
ARRAY.prototype.valueify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].valueify());
  return a;
}
ARRAY.prototype.stringify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].stringify().toString() + characters.correct("ð");
  // Removes the last block character.
  s = s.slice(0, s.length - 1);
  return new STRING(s);
}
ARRAY.prototype.arrayify = function() {
  return this.copy();
}
ARRAY.prototype.numberify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].numberify());
  var sum = 0;
  for(i = 0; i < this.value.length; ++i) sum += a[i].value;
  return new NUMBER(sum);
}
ARRAY.prototype.integerify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].integerify());
  var sum = 0;
  for(i = 0; i < this.value.length; ++i) sum += a[i].value;
  return new NUMBER(sum);
}
ARRAY.prototype.printify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].printify() + characters.correct("ð");
  // Removes the last block character.
  s = s.slice(0, s.length - 1);
  return s;
}

/// Operators
ARRAY.prototype.increment = function(path) {
  var f = path.top();
  if(f) {
    this.value.push(f);
  }
  return this;
}

ARRAY.prototype.decrement = function(path) {
  var s = this.value.shift();
  if(s) path.top(s);
  return this;
}

ARRAY.prototype.increment_flip = function(path) {
  var f = path.top();
  if(f) {
    this.value.unshift(f);
  }
  return this;
}

ARRAY.prototype.decrement_flip = function(path) {
  var s = this.value.pop();
  if(s) path.top(s);
  return this;
}

ARRAY.prototype.add = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add(rhs);
  }
  return this;
}

ARRAY.prototype.sub = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub(rhs);
  }
  return this;
}

ARRAY.prototype.add_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add_flip(lhs);
  }
  return this;
}

ARRAY.prototype.sub_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub_flip(lhs);
  }
  return this;
}

/// Array specific commands.
ARRAY.prototype.correct_index = function(index) {
  // Overkill for what it is actually doing...
  return ((index % this.length()) + this.length()) % this.length();
};


ARRAY.prototype.access = function(index) {
  return this.value[this.correct_index(index)].copy();
};

ARRAY.prototype.length = function() {
  return this.value.length;
};

/// Misc.

ARRAY.prototype.to_lowercase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].to_lowercase();
  return this;
}

ARRAY.prototype.to_uppercase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].to_uppercase();
  return this;
}

ARRAY.prototype.switchcase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].switchcase();
  return this;
}

ARRAY.prototype.is_truthy = function() {
  return new NUMBER(this.length() ? 1 : 0);
}

ARRAY.prototype.is_falsy = function() {
  return new NUMBER(this.length() ? 0 : 1);
}

ARRAY.prototype.relocate = function(from, to) {
  var s = this.value.splice(from, 1);
  this.value.splice(to, 0, s[0]);
  return this;
}
;;(function(global, Pipe){

function Command(tkn, f) {
  this.tkn = tkn;
  this.methods = [];
  var self = this;
  function invoke() {
    for(var i = 0, l = self.methods.length; i < l; ++i)
      self.methods[i].apply(self, Array.prototype.slice.call(arguments))
  }
  Object.defineProperty(self, "exec", {
    get: function() { return invoke },
    set: function(v) { self.methods.push(v) }
  });
  
  if(f) f(this);
};

Command.commands = [];
Command.add = function(li, r, f) {
  Command.commands.push({literal_index: li+1, regex:r, f:f});
};
function CommandLookUp(res, index) {
  this.index = index;
  this.literal = res[Command.commands[index].literal_index];
  this.params = [];
  for(var i = 1; i < res.length; ++i) if(i !== Command.commands[index].literal_index) this.params.push(res[i]);
  this.captured = res[0];
};
Command.find = function(text) {
  for(var i = Command.commands.length; i--;) {
    var res = Command.commands[i].regex.exec(text);
    if(res) {
      var p = new CommandLookUp(res, i);
      return p;
    }
  }
};
  
Command.prototype.tokenize = function() {
  this.tkn.branches.front(new Token(this.tkn.end+1, this.tkn.code, this.tkn));
  return this.tkn.branches.first();
};

global.Command = Command;

///////////////////////////////////////////////////////////////////////////////

function Token(start, code, parent) {
  this.start = start;
  this.code = code;
  this.parent = parent;
  if(parent) this.path = parent.path;
  this.branches = new Pipe();
};

Token.prototype.tokenize = function() {
  Token.parse(this);
  if(this.cmd) {
    var spawned = this.cmd.tokenize();
    return spawned.tokenize();
  } else if(this.parent) {
    this.parent.branches.remove(this);
    return this.parent;
  }
}

Token.prototype.next = function() {
  return this.branches.first();
}

Token.parse = function(tkn) {  
  var i = tkn.start, string = tkn.code[i], look = undefined;
  //while(tkn.code[i] !== "\n" && i < tkn.code.length) {
  // Parses entire script to find the best command.
  while(i < tkn.code.length) {
    var get = Command.find(string);
    // If found a command that uses more characters then use that.
    if(get !== undefined) {
      look = get;
    }
    string += tkn.code[++i];
  }
  
  if(look) {
    tkn.literal = look.literal;
    tkn.end = tkn.start + look.captured.length - 1;
    tkn.cmd = new Command(tkn, Command.commands[look.index].f);
    tkn.params = look.params;
  }
}

global.Token = Token;

})(this, this.Pipe)
;;(function(global, Pipe, Command, Token){

function Path(code, tkn) {
  this.code = code;
  this.start = new Token(0, this.code, tkn);
  this.start.path = this;
  this.current = this.start;
  this.end = this.start.tokenize();
  this.previous = this.end;
  this.onsteps = [];
  this.onstarts = [];
  this.onends = [];
  this.onstops = [];
  this.timeout = undefined;
  this.rate = 0;
  this.kill_this = false;
  
  var self = this;
  function invoke_onsteps() { for(var i = 0, l = self.onsteps.length; i < l; ++i) self.onsteps[i].call(self) };
  function invoke_onstarts() { for(var i = 0, l = self.onstarts.length; i < l; ++i) self.onstarts[i].call(self) };
  function invoke_onends() { for(var i = 0, l = self.onends.length; i < l; ++i) self.onends[i].call(self) };
  function invoke_onstops() { for(var i = 0, l = self.onstops.length; i < l; ++i) self.onstops[i].call(self) };
  
  Object.defineProperty(self, "onstep", {
    get: function() { return invoke_onsteps },
    set: function(v) { self.onsteps.push(v) }
  });
  Object.defineProperty(self, "onstart", {
    get: function() { return invoke_onstarts },
    set: function(v) { self.onstarts.push(v) }
  });
  Object.defineProperty(self, "onend", {
    get: function() { return invoke_onends },
    set: function(v) { self.onends.push(v) }
  });
  Object.defineProperty(self, "onstop", {
    get: function() { return invoke_onstops },
    set: function(v) { self.onstops.push(v) }
  });
  
  this.stdin = new Pipe();
  this.stdout = new Pipe();
}

Path.prototype.step = function() {
  if(!this.current) return false;
  if(this.current === this.start) this.onstart();
  this.current.cmd.exec(this);
  this.previous = this.current;
  this.current = this.current.next();
  this.onstep();
  return !this.kill_this && !!this.current;
}

Path.prototype.stop = function() {
  if(this.timeout) {
    clearTimeout(this.timeout);
    this.timeout = undefined;
    this.kill_this = true;
    this.onstop();
    this.onend();
  }
}

Path.prototype.exec = function() {
  this.stop();
  var self = this;
  this.kill_this = false;
  (function loop(){
    if(self.step()) {
      self.timeout = setTimeout(loop, self.rate);
    } else {
      self.timeout = undefined;
      self.onend();
    }
  })()
}

global.Path = Path;

})(this, this.Pipe, this.Command, this.Token)
;;(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

function insertAt(array, pos, item) {
  array.splice(pos, 0, item);
};
function removeAt(array, pos) {
  return array.splice(pos, 1)[0];
};

Path.prototype.printify = function() {
  var r = (new ARRAY(this.stdout.__array__)).printify();
  
  var blocks = r.split(characters.correct("ð")), rows = [];
  for(var i = 0; i < blocks.length; ++i) {
    var block = blocks[i], row = 0;
    for(var j = 0; j < block.length; ++j) {
      if(rows[row] === undefined) rows[row] = "";
      if(block[j] === characters.correct("¬")) row++;
      else rows[row] += block[j];
    }
  }
  
  r = (rows[0] === undefined ? "" : rows[0]);
  for(var i = 1; i < rows.length; ++i) r += "\n" + (rows[i] === undefined ? "" : rows[i]);
  
  return r;
}

Path.prototype.first = function() {
  return this.stack.value[this.stack.ptr-1]
};

Path.prototype.last = function() {
  return this.stack.value[0]
};

Path.prototype.top = function(item) {
  var pos = this.stack.ptr;
  if(arguments.length === 1) {
    if(item === undefined) return;
    if(item.type === "ARRAY") {
      if(item.ptr === undefined) item.ptr = 0;
      item.container = this.stack;
    }
    
    insertAt(this.stack.value, pos, item);
    this.stack.ptr = pos+1;
  } else {
    item = removeAt(this.stack.value, pos-1);
    if(item) {
      if(item.type === "ARRAY") {
        item.container = undefined;
      }
      this.stack.ptr = pos-1;
    }
    return item;
  }
};

Path.prototype.bottom = function(item) {
  var pos = this.stack.ptr;
  if(arguments.length === 1) {
    if(item === undefined) return;
    if(item.type === "ARRAY") {
      if(item.ptr === undefined) item.ptr = 0;
      item.container = this.stack;
    }
    
    insertAt(this.stack.value, 0, item);
    this.stack.ptr = pos+1;
  } else {
    item = removeAt(this.stack.value, 0);
    if(item) {
      if(item.type === "ARRAY") {
        item.container = undefined;
      }
      this.stack.ptr = pos-1;
    }
    return item;
  }
};
  
Path.prototype.move_up = function() {
  var pos = this.stack.ptr;
  if(0 <= pos && pos < this.stack.length()) {
    this.stack.ptr = pos+1;
  }
};
  
Path.prototype.move_down = function() {
  var pos = this.stack.ptr;
  if(0 < pos && pos <= this.stack.length()) {
    this.stack.ptr = pos-1;
  }
};
  
Path.prototype.move_to_top = function() {
  this.stack.ptr = this.stack.length();
};
  
Path.prototype.move_to_bottom = function() {
  this.stack.ptr = 0;
};
  
Path.prototype.jump_in = function() {
  var item = this.top();
  if(item === undefined) {
    item = new ARRAY();
  } else {
    item = item.arrayify();
  }
  this.top(item);
  
  this.stack = item;
};
  
Path.prototype.jump_out = function() {
  var container = this.stack.container;
  if(container === undefined) {
    container = new ARRAY([this.stack]);
    this.stack.container = container;
    container.ptr = 1;
  }
  
  this.stack = container;
};
  
Path.prototype.reverse_stack = function() {
  for(var i = 0,  l = Math.floor(this.stack.ptr/2); i < l; ++i) {
    var temp = this.stack.value[i];
    this.stack.value[i] = this.stack.value[this.stack.ptr - i - 1];
    this.stack.value[this.stack.ptr - i - 1] = temp;
  }
}

function parseJsObject(JS) {
  if(typeof JS === "string") {
    return new STRING(JS);
  } else if(typeof JS === "number") {
    return new NUMBER(JS);
  } else if(JS instanceof Array) {
    var a = [];
    for(var i = 0; i < JS.length; ++i) {
      var item = parseJsObject(JS[i]);
      if(item) a.push(item);
    }
    return new ARRAY(a);
  }
};
  
global.noodel = function noodel(code) {
  if(typeof code === "string" && code.length) {
    var path = new Path(code);
    path.stack = new ARRAY();
    path.stack.ptr = 0;
    path.onstart = function() { while(this.stdin.first()) this.top(this.stdin.front()) };
    path.onend = function() { if(this.first()) this.stdout.back(this.top()) };
    
    for(var i = 1; i < arguments.length; ++i) {
      var item = parseJsObject(arguments[i]);
      if(item) path.stdin.back(item);
    }
    
    return path;
  }
};
noodel.commandify = function(cmd) {
  if(arguments.length > 1)
    cmd = Array.prototype.join.call(arguments, ")(");
  return new RegExp("^(" + cmd + ")$");
};
  
noodel.make_error = function(o, path) {
  path.exceptions.back(new STRING("¶[EXCEPTION]:")).back(o);
};
  
noodel.random = function(min, max) {
  return ((max - min) * Math.random()) + min
};
  
noodel.random_int = function(min, max) {
  return Math.floor(noodel.random(min, max))
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(0, noodel.commandify("[ \n]"), function(cmd) {});
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", " "), function(cmd) {
  cmd.exec = function(path) {
    if(this.tkn.count === undefined) {
      this.tkn.count = this.tkn.params[0];
      var temp = this.tkn.old_next;
      this.tkn.old_next = this.tkn.next;
      this.tkn.next = temp;
    }
    
    if(this.tkn.count-- < 1) {
      this.tkn.count = undefined;
      var temp = this.tkn.old_next;
      this.tkn.old_next = this.tkn.next;
      this.tkn.next = temp;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    var tkn = this.tkn;
    this.tkn.old_next = function() { return tkn };
    return old.call(this);
  }
});

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Misc. Commands.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Terminates the program.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "`"), function(cmd) {
  cmd.exec = function(path) {
    path.stop();
  }
});

//------------------------------------------------------------------------------------------------------------
/// Clears the properties that were added to a particulat object.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "~"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first(); if(f) f.props.clear();
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "o"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2));
      } else {
        path.top(new NUMBER(f.length() % 2));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "O"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2));
      } else {
        path.top(new NUMBER(f.length() % 2));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "e"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2 ? 1 : 0));
      } else {
        path.top(new NUMBER(f.length() % 2 ? 1 : 0));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "E"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2 ? 1 : 0));
      } else {
        path.top(new NUMBER(f.length() % 2 ? 1 : 0));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        var max, min;
        var g = path.top();
        if(g) {
          max = Math.max(f.value, g.value);
          min = Math.min(f.value, g.value);
        } else {
          max = Math.max(f.value, 0);
          min = Math.min(f.value, 0);
        }
        path.top(new NUMBER(noodel.random_int(min, max)));
      } else {
        path.top(f);
        path.top(new NUMBER(noodel.random_int(0, f.length() - 1)));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(noodel.random_int(0, this.tkn.params[0])));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(0, noodel.commandify(characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    path.move_up();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(0, noodel.commandify(characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    path.move_down();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    var c = this.tkn.params[0];
    while(c--) path.move_up();
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0])
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    var c = this.tkn.params[0];
    while(c--) path.move_down();
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0])
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      while(c--) path.move_up();
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      while(c--) path.move_down();
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr to the top.
Command.add(0, noodel.commandify(characters.correct("ƥ")+"\\*"), function(cmd) {
  cmd.exec = function(path) {
    path.move_to_top();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr to the bottom.
Command.add(0, noodel.commandify(characters.correct("ʠ")+"\\*"), function(cmd) {
  cmd.exec = function(path) {
    path.move_to_bottom();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Jump into the array at the current position, if there is not an array it will create one.
Command.add(0, noodel.commandify(characters.correct("ı")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_in();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Jump outof the array, if there is not an array it will create one.
Command.add(0, noodel.commandify(characters.correct("ȷ")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_out();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Negate the object on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "!"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(f.is_falsy());
    } else {
      path.top(new NUMBER(1));
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Negate the object on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "?"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(f.is_truthy());
    } else {
      path.top(new NUMBER(0));
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(1, noodel.commandify(characters.correct("µ"), characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = f.integerify();
      for(var i = f.value; i--;) {
        path.top(new STRING(this.tkn.literal));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    for(var i = this.tkn.params[0]; i--;) {
      path.top(new STRING(this.tkn.literal));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(0, noodel.commandify(characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.literal));
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles basic compressed string literals of printable characters.
Command.add(0, noodel.commandify(characters.correct("“"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(0, noodel.commandify(characters.correct("”"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i) a.push(new STRING(this.tkn.params[0][i]));
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    this.tkn.params[0] = string_break(this.tkn.params[0]);
    
    return old.call(this);
  };
});
  
//------------------------------------------------------------------------------------------------------------
// Handles occur compressed string literals of printable characters.
Command.add(1, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("‘"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(1, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("’"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i) a.push(new STRING(this.tkn.params[0][i]));
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    this.tkn.params[0] = string_break(this.tkn.params[0]);
    
    return old.call(this);
  };
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(\-?\\d*\\.?\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+"-)$"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(-1));
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number based off of a fraction and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(-?\\d*\\/\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    
    path.top(new NUMBER(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var a = this.tkn.params[0].split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      if(a[0] === "-") num = -1;
      else num = +a[0];
    }
    
    this.tkn.params[0] = num / den;
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(1, noodel.commandify(characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var s = "";
    var left = characters.char_to_int(this.tkn.params[0]),
        right = characters.char_to_int(this.tkn.params[1]);
    var min = Math.min(left, right),
        max = Math.max(left, right);
    
    for(var i = min; i <= max; ++i) {
      s += characters.int_to_char(i);
    }
    
    if(min === right) s = s.split("").reverse().join("");
    
    this.tkn.params[0] = s;
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(2, noodel.commandify("'", characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    
    for(var i = this.tkn.min; i <= this.tkn.max; ++i) {
      s.push(new STRING(characters.int_to_char(i)));
    }
    
    if(this.tkn.min === this.tkn.params[2]) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[1] = characters.char_to_int(this.tkn.params[1]);
    this.tkn.params[2] = characters.char_to_int(this.tkn.params[2]);
    
    this.tkn.min = Math.min(this.tkn.params[1], this.tkn.params[2]);
    this.tkn.max = Math.max(this.tkn.params[1], this.tkn.params[2]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(2, noodel.commandify("#", "\\d+", characters.correct("…"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    
    for(var i = this.tkn.min; i <= this.tkn.max; ++i) {
      s.push(new NUMBER(i));
    }
    
    if(this.tkn.min === this.tkn.params[2]) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[1] = +this.tkn.params[1];
    this.tkn.params[2] = +this.tkn.params[2];
    
    this.tkn.min = Math.min(this.tkn.params[1], this.tkn.params[2]);
    this.tkn.max = Math.max(this.tkn.params[1], this.tkn.params[2]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = "";
    
      for(var i = max; min <= i; --i) {
        s += NUMBER.numerical_eval(new NUMBER(i)).value;
      }
      
      if(min === left) { s = s.split("").reverse().join("") }
      
      path.top(new STRING(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(0, noodel.commandify("'" + characters.correct("µ") + characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(NUMBER.numerical_eval(new NUMBER(i)));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(0, noodel.commandify("#" + characters.correct("µ") + characters.correct("…"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(new NUMBER(i));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(1, noodel.commandify(characters.regex.a_printable, characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = "";
    
      for(var i = max; min <= i; --i) {
        s += NUMBER.numerical_eval(new NUMBER(i)).value;
      }
      
      if(min === left) { s = s.split("").reverse().join("") }
      
      path.top(new STRING(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(2, noodel.commandify("'", characters.regex.a_printable, characters.correct("…") +  characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(NUMBER.numerical_eval(new NUMBER(i)));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[1]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(2, noodel.commandify("#", "\\d+", characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(new NUMBER(i));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[1];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = "";

        for(var i = max; min <= i; --i) {
          s += NUMBER.numerical_eval(new NUMBER(i)).value;
        }

        if(min === left) { s = s.split("").reverse().join("") }

        path.top(new STRING(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(0, noodel.commandify("'" + characters.correct("µ") + characters.correct("…") +  characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top()
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = [];

        for(var i = max; min <= i; --i) {
          s.push(NUMBER.numerical_eval(new NUMBER(i)));
        }

        if(min === left) { s = s.reverse() }

        path.top(new ARRAY(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(0, noodel.commandify("#" + characters.correct("µ") + characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = [];

        for(var i = max; min <= i; --i) {
          s.push(new NUMBER(i));
        }

        if(min === left) { s = s.reverse() }

        path.top(new ARRAY(s));
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("ç")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    path.stdout.wipe();
    if(f) {
      path.stdout.back(f.copy());
    }
  }
});
  

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Ç")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    path.stdout.wipe();
    if(f) {
      path.stdout.back(f);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy()).back(new STRING("¶"));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("Ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f).back(new STRING("¶"));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Places the stack into the stdout.
Command.add(0, noodel.commandify(characters.correct("Ð")), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.back(path.stack);
  }
});

//------------------------------------------------------------------------------------------------------------
// Clears the stdout.
Command.add(0, noodel.commandify(characters.correct("ß")), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.wipe();
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Removes the current stack.
Command.add(0, noodel.commandify(characters.correct("Ḃ")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_out();
    path.top();
  }
});

//------------------------------------------------------------------------------------------------------------
// Removes the item on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = function(path) {
    path.top();
  }
});

//------------------------------------------------------------------------------------------------------------
// Removes the item on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ḃ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = this.tkn.params[0]; i-- && path.first();) {
      a.push(path.top())
    }
    path.top();
    for(var i = a.length; i--;) {
      path.top(a[i]);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Removes the item on the bottom of the stack.
Command.add(0, noodel.commandify(characters.correct("ċ")), function(cmd) {
  cmd.exec = function(path) {
    path.bottom();
  }
});

//------------------------------------------------------------------------------------------------------------
// Removes the item on the bottom of the stack.
Command.add(0, noodel.commandify(characters.correct("ċ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = this.tkn.params[0]; i-- && path.last();) {
      a.push(path.bottom())
    }
    path.bottom();
    for(var i = a.length; i--;) {
      path.bottom(a[i]);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Reverses the stack.
Command.add(0, noodel.commandify(characters.correct("Ċ")), function(cmd) {
  cmd.exec = function(path) {
    path.reverse_stack();
  }
});

//------------------------------------------------------------------------------------------------------------
// Duplicates the item on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ḋ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.top(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Duplicates the item on the top of the stack.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ḋ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      for(var c = this.tkn.params[0]; c--;) {
        path.top(f.copy());
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is on the top of the stack to the bottom.
Command.add(0, noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.bottom(f);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is on the bottom of the stack and places it on the top.
Command.add(0, noodel.commandify(characters.correct("Ė")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.bottom();
    if(f) path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Swaps what is on the top of the stack with the item right below it.
Command.add(0, noodel.commandify(characters.correct("ṡ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      path.top(f);
      if(g) {
        path.top(g);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Swaps what is on the bottom of the stack with the item right above it.
Command.add(0, noodel.commandify(characters.correct("Ṡ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.bottom();
    if(f) {
      var g = path.bottom();
      path.bottom(f);
      if(g) {
        path.bottom(g);
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Loops.
//------------------------------------------------------------------------------------------------------------

Command.is_loop = function(literal) {
  return literal === characters.correct("ḷ") ||
         literal === characters.correct("Ḷ") ||
         literal === characters.correct("ṃ") ||
         literal === characters.correct("Ṃ") ||
         literal === characters.correct("ṇ") ||
         literal === characters.correct("Ṇ");
}
  
Command.is_break = function(literal) {
  return literal === characters.correct("ḅ") ||
         literal === characters.correct("Ḅ")
}
  
Command.collect_loop = function(start, code) {
  var s = "", count = 0;
  for(var i = start; i < code.length && code[i] !== "\n"; ++i) {
    s += code[i];
    if(Command.is_loop(code[i])) count++;
    else if(Command.is_break(code[i]) || (code[i] === characters.correct("€"))) {
      if(count === 0) {
        return s;
      } else {
        count--;
      }
    }
  }
  return s;
}

//------------------------------------------------------------------------------------------------------------
/// NOP used to end loops.
Command.add(0, noodel.commandify(characters.correct("€")), function(cmd) {  
  cmd.exec = function(path) {}
});

//------------------------------------------------------------------------------------------------------------
/// Contiously loops the code following it up to a new line.
Command.add(0, new RegExp("^(" + characters.correct("ḷ") + ")$"), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
    else this.tkn.loop_count++;
  }
});

//------------------------------------------------------------------------------------------------------------
/// Loops the given code up to a new line based off of the integerified value in the pipe which is removed.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = path.top();
      if(f) {
        if(f.type === "ARRAY" || f.type === "STRING") {
          tkn.count = f.length();
          path.top(f);
        } else {
          f = f.integerify();
          tkn.count = f.value;
        }
      } else tkn.count = 0;
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    } else {
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops the given code up to a new line based off of the number placed next to it.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")(\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      tkn.count = tkn.params[0];
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    } else {
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[1] = Command.collect_loop(tkn.start + 1 + tkn.params[0].length, tkn.code);
    tkn.end = tkn.params[1].length + tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[1], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    tkn.params[0] = +tkn.params[0];
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as there is something in the front of the pipe that is truthy and removes if falsy.
Command.add(0, noodel.commandify(characters.correct("ṃ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as there is something in the front of the pipe that is truthy and always removes.
Command.add(0, noodel.commandify(characters.correct("Ṃ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.top();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as the item on the top is truthy, if is falsey it will consume otherwise it will leave it.
Command.add(0, noodel.commandify(characters.correct("ṇ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      path.top();
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as the item on the top is truthy, if is truthy it will consume otherwise it will leave it.
Command.add(0, noodel.commandify(characters.correct("Ṇ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      path.top();
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Breaks out of a looping command.
Command.add(0, noodel.commandify(characters.correct("ḅ")), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn, p = tkn.parent;
    while(!Command.is_loop(p.literal) && !p.has_break) {
      p = p.parent;
    }
    
    tkn.looper = p;
    p.has_break = tkn;
    
    tkn.next = function() {
      var next = tkn.looper.branches.first();
      tkn.looper.loop_count = undefined;
      return next === tkn.looper.sub_path.start ? undefined : next
    };
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Breaks out of a looping command depending on if the first item in the pipe is falsy which is removed.
Command.add(0, noodel.commandify(characters.correct("Ḅ")), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn, p = tkn.parent;
    while(!Command.is_loop(p.literal) && !p.has_break) {
      p = p.parent;
    }
    
    tkn.looper = p;
    p.has_break = tkn;
    this.tkn.old_next = this.tkn.next;
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    // Must reset everything.
    this.tkn.next = this.tkn.old_next;
    
    var f = path.top();
    if(f && f.is_truthy().value) {
      path.top(f);
    } else {
      this.tkn.old_next = this.tkn.next;
      var tkn = this.tkn;
      tkn.next = function() {
        var next = tkn.looper.branches.first();
        tkn.looper.loop_count = undefined;
        return next === tkn.looper.sub_path.start ? undefined : next
      };
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pushes the current loop count onto the stack.
Command.add(0, noodel.commandify(characters.correct("ɱ")), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var p = this.tkn.parent;
    while(!Command.is_loop(p.literal)) {
      p = p.parent;
    }
    
    this.tkn.looper = p;
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    path.top(new NUMBER(this.tkn.looper.loop_count));
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Time.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps based off of what is in the pipe.
Command.add(0, noodel.commandify(characters.correct("ḍ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = f.integerify().value;
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "[shqeto]"), function(cmd) {
  var map = { s: 1000, h: 500, q: 250, e: 125, t: 100, o: 10 };
  function get_rate(c) {
    return map[c];
  };
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = get_rate(this.tkn.params[0]);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using fractions
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var num = 1000, den = 1;
    if(this.tkn.params[0].length) {
      num *= +this.tkn.params[0];
    }
    if(this.tkn.params[1].length) {
      den = +this.tkn.params[1];
    }
    this.tkn.params[0] = Math.floor(num / den);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using decimals
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = Math.floor((+("0"+this.tkn.params[0]+"."+this.tkn.params[1]+"0")) * 1000);
    return old.call(this);
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Type cast operations.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Numberifies strings and arrays by elements if already a number it will flip the sign.
Command.add(0, noodel.commandify(characters.correct("ɲ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].numberify();
        }
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(-1 * Math.abs(f.value)));
      } else if(f.type === "STRING") {
        var a = new ARRAY(string_null_break(f.value));
        for(var i = 0; i < a.length(); ++i) {
          a.value[i] = (new STRING(a.value[i])).numberify();
        }
        if(a.length() === 0) {
          a = new NUMBER(0);
        } else if(a.length() === 1) {
          a = a.value[0]
        }
        path.top(a);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"'"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].stringify();
        }
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(f.stringify());
      } else if(f.type === "STRING") {
        var s = "";
        for(var i = f.length(); i--;) {
          s += f.value[i];
        }
        path.top(new STRING(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+'"'), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "STRING") {
        path.top(new STRING(string_null_break(f.value).join("")));
      } else {
        path.top(f.stringify());
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Numberifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"#"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].numberify();
        }
        path.top(f);
      } else if(f.type === "STRING") {
        path.top(f.numberify());
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(-1 * f.value));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Arrayifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ʋ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "STRING") {
        path.top(f.arrayify());
      } else if(f.type === "NUMBER") {
        f = new ARRAY(factorize_number(f.value));
        for(var i = 0; i < f.length(); ++i) f.value[i] = new NUMBER(f.value[i]);
        path.top(f);
      } else if(f.type === "ARRAY") {
        for(var i = f.length(); i--;) f.value.reverse();
        path.top(f);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects all of the items in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("æ")), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    while(path.first()) a.push(path.top());
    if(a.length) path.top(new ARRAY(a));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified by the count and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("æ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = +this.tkn.params[0]; i-- && path.first();) a.push(path.top());
    if(a.length) {
      path.top(new ARRAY(a));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("æ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var a = [];
      for(var i = f.integerify().value; i-- && path.first();) a.push(path.top());
      if(a.length) {
        path.top(new ARRAY(a));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Numerically evalues an item on the stack and pushes the result.
Command.add(0, noodel.commandify(characters.correct("ȥ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(NUMBER.numerical_eval(f));
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){
  
//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(0, noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁺")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add_flip(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub_flip(rhs));
      } else path.top(lhs);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.add(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.sub(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁺") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.add_flip(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁻") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.sub_flip(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.add(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.sub(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁺") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.add_flip(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁻") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.sub_flip(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.increment(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.decrement(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") + "s", "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.increment_flip(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + "s", "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.decrement_flip(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value * c));
        } else {
          while(c--) g = g.increment(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value / c));
        } else {
          while(c--) g = g.decrement(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") +"s" + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value * c));
        } else {
          while(c--) g = g.increment_flip(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + "s" + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value / c));
        } else {
          while(c--) g = g.decrement_flip(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Modulates two items in the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "%"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = f.integerify();
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value % f.value));
        } else if(g.type === "STRING") {
          var width = Math.floor(g.length() / f.value);
          var length = (width * f.value);
          var upper = g.value.slice(0, length),
              lower = g.value.slice(length, g.length());
          path.top(new STRING(upper));
          path.top(new STRING(lower));
        } else if(g.type === "ARRAY") {
          var width = Math.floor(g.length() / f.value);
          var length = (width * f.value);
          var upper = g.value.slice(0, length),
              lower = g.value.slice(length, g.length());
          path.top(new ARRAY(upper));
          path.top(new ARRAY(lower));
        }
      } else path.top(f);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Modulates two items in the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "%s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        g = g.integerify();
        if(f.type === "NUMBER") {
          path.top(new NUMBER(f.value % g.value));
        } else if(f.type === "STRING") {
          var width = Math.floor(f.length() / g.value);
          var length = (width * f.value);
          var upper = f.value.slice(0, length),
              lower = f.value.slice(length, f.length());
          path.top(new STRING(upper));
          path.top(new STRING(lower));
        } else if(f.type === "ARRAY") {
          var width = Math.floor(f.length() / g.value);
          var length = (width * g.value);
          var upper = f.value.slice(0, length),
              lower = f.value.slice(length, f.length());
          path.top(new ARRAY(upper));
          path.top(new ARRAY(lower));
        }
      } else path.top(f);
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Array Based Operators
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Flattens that particular data type (for arrays places into elements, strings turned into char arrays
/// and numbers into integers.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"_"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.value.length; ++i) path.top(f.value[i]);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value * f.value));
      } else if(f.type === "STRING") {
        for(var i = 0; i < f.value.length; ++i) path.top(new STRING(f.value[i]));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Gets magnitude of that particular data type.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"l"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.abs(f.value)));
      } else if(f.type === "STRING" || f.type === "ARRAY") {
        path.top(f);
        path.top(new NUMBER(f.length()));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Takes the first element of strings/arrays and places it into the back. For numbers, it reciprocates.
Command.add(0, noodel.commandify(characters.correct("ẹ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.shift();
        if(e) f.value.push(e);
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(1/f.value));
      } else if(f.type === "STRING") {
        var s = f.value;
        path.top(new STRING(s.slice(1, s.length) + s.slice(0, 1)));
      }
    } else path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Takes the last element of strings/arrays and places it into the front. For numbers, it square roots.
Command.add(0, noodel.commandify(characters.correct("Ẹ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.pop();
        if(e) f.value.unshift(e);
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.sqrt(f.value)));
      } else if(f.type === "STRING") {
        var s = f.value, len = s.length;
        path.top(new STRING(s.slice(len-1, len) + s.slice(0, len-1)));
      }
    } else path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(0, noodel.commandify(characters.correct("ạ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var index, delta, count;
      if(f.type === "NUMBER") {
        f = f.integerify();
        index = f.value;
        delta = index < 0 ? -1 : 1;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + delta));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        f = f.integerify();
        count = f.value;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + (delta * count)));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.abs((index + (delta * count))) % f.value));
      } else {
        if(f.type === "STRING") f = f.arrayify();
        if(index === undefined) index = f.props("frame");
        if(index === undefined) { index = 0; delta = 1; }
        if(count === undefined) count = f.props("frame_count");
        if(count === undefined) count = f.length();
        if(delta === undefined) delta = f.props("frame_delta");
        
        var item;
        
        if(count !== 0) {
          index = f.correct_index(index);
          item = f.access(index);
          index += delta;
          --count;
        }
        
        if(count === 0) {
          f.props("frame", undefined);
          f.props("frame_count", undefined);
          f.props("frame_delta", undefined);
        } else {
          f.props("frame", index);
          f.props("frame_count", count);
          f.props("frame_delta", delta);
        }
        
        path.top(f);
        path.top(item);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
/// The number following the token will be used as the first number.
Command.add(0, new RegExp("^(" + characters.correct("ạ") + ")((?:\\-\\d*)|(?:\\d+))$"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var index = this.tkn.index,
          count = undefined;
      var delta = this.tkn.delta;
      
      if(f.type === "NUMBER") {
        f = f.integerify();
        count = f.value;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + (delta * count)));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        path.top(new NUMBER((index + (delta * count))) % f.value);
      } else {
        if(f.type === "STRING") f = f.arrayify();
        if(f.props("frame") !== undefined) index = f.props("frame");
        if(count === undefined) count = f.props("frame_count");
        if(count === undefined) count = f.length();
        
        var item;
        
        if(count !== 0) {
          index = f.correct_index(index);
          item = f.access(index);
          index += delta;
          --count;
        }
        
        if(count === 0) {
          f.props("frame", undefined);
          f.props("frame_count", undefined);
          f.props("frame_delta", undefined);
        } else {
          f.props("frame", index);
          f.props("frame_count", count);
          f.props("frame_delta", delta);
        }
        
        path.top(f);
        path.top(item);
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    if(this.tkn.params[0] === "-") {
      this.tkn.index = -1;
      this.tkn.delta = -1;
    } else if(this.tkn.params[0] === "-0") {
      this.tkn.index = 0;
      this.tkn.delta = -1;
    } else {
      this.tkn.index = +this.tkn.params[0];
      this.tkn.delta = this.tkn.index < 0 ? -1 : 1;
    }
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string based off of an array.
Command.add(0, noodel.commandify(characters.correct("Ạ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var g = path.top();
        if(g) {
          if(g.type === "ARRAY") {
            if(f.props("frame") === undefined) f.props("frame", 0);
            var item = g.access(f.access(f.props("frame")));
            f.props("frame", f.correct_index(f.props("frame") + 1));

            path.top(g);
            path.top(f);
            path.top(item);
          }
        }
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;;(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// String Manipulation Commands.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Converts element into lowercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "L"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_lowercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Converts element into uppercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "U"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_uppercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Switches case of item.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "S"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.switchcase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Relocates an element in an object.
Command.add(0, noodel.commandify(characters.correct("ṙ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        var h = path.top();
        if(h) {
          path.top(h.relocate(f.integerify().value, g.integerify().value));
        } else {
          path.top(g);
          path.top(h);
        }
      } else {
        path.top(f);
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
;
