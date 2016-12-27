(function(global){

function handleBug(s) { return s[s.length-1] };
var int_to_char = [
'ð','¬','¶','¤','!','"','#','$','%','&',"'",'(',')','*','+',',',
'-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<',
'=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',
']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l',
'm','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|',
'}','~','Ạ','Ḅ','Ḍ','Ẹ','Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ','Ṭ',
'Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ','Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ','Ṁ',
'Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ','Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ','ị',
'ḳ','ḷ','ṃ','ṇ','ọ','ṛ','ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ','ċ',
'ḋ','ė','ḟ','ġ','ḣ','ŀ','ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ','ẏ',
'ż','Æ','Ç','Ð','Ñ','Ø','Œ','Þ','ß','æ','ç','ı','ȷ','ñ','ø','œ',
'þ','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ','Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ',
'ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ','ƭ','ʋ','ȥ','€','¢','£','¥',
'½','µ','¡','¿','×','÷','¦','©','®','«','»','‘','’','“','”','°',
'¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','⁺','⁻','⁼','⁽','⁾',' ','\n'
];

var regexified = [
'ð','¬','¶','¤','!','"','#','\\$','%','&',"'",'\\(','\\)','\\*','\\+',',',
'-','\\.','/','0','1','2','3','4','5','6','7','8','9',':',';','<',
'=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','\\[','\\\\',
'\\]','\\^','_','`','a','b','c','d','e','f','g','h','i','j','k','l',
'm','n','o','p','q','r','s','t','u','v','w','x','y','z','{','\\|',
'}','~','Ạ','Ḅ','Ḍ','Ẹ','Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ','Ṭ',
'Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ','Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ','Ṁ',
'Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ','Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ','ị',
'ḳ','ḷ','ṃ','ṇ','ọ','ṛ','ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ','ċ',
'ḋ','ė','ḟ','ġ','ḣ','ŀ','ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ','ẏ',
'ż','Æ','Ç','Ð','Ñ','Ø','Œ','Þ','ß','æ','ç','ı','ȷ','ñ','ø','œ',
'þ','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ','Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ',
'ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ','ƭ','ʋ','ȥ','€','¢','£','¥',
'½','µ','¡','¿','×','÷','¦','©','®','«','»','‘','’','“','”','°',
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
characters.compressables.max = 225;
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
characters.noncompressables.min = 226;
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


characters.printify_char = function(c) {
  if(c === characters.correct("¶")) return "\n";
  if(c === characters.correct("¤")) return " ";
  return c;
};

characters.printify_string = function(s) {
  var r = "";
  for(var i = 0; i < s.length; ++i) r += characters.printify_char(s[i]);
  return r;
};
  
characters.deprintify_char = function(c) {
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
  for(var i = 0, l = s.length; i < l; ++i) {
    a = a.concat(characters.bitify_char(s[i]).slice(1, 8));
  }
  // Make sure divisable by 8.
  var diff = a.length % 8;
  if(diff) {
    diff = 8 - diff;
    while(diff--) a.push(0);
  }
  return characters.debitify_string(a);
};
  
characters.decompress_basic = function(s) {
  var bits = characters.bitify_string(s), r = "";
  for(var i = 0; i < bits.length; i += 7) {
    r += characters.debitify_char(bits.slice(i, 7));
  }
  return r;
};
  
characters.correct = handleBug;
  
global.characters = characters;

})(this)
