(function(global){


//----------------------------------------------------------------------------------------
var chars = '\u00b0\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079\u00b6\u00d7\u00f7\u207a\u207b\u207c\u2260\u2264\u2265\u2261\u2248\u207d\u207e\u221e\u00bf\u00a1\u203c\u2026\u20ac\u00a2\u00a3\u00a5\u00a4\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003a\u003b\u003c\u003d\u003e\u003f\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004a\u004b\u004c\u004d\u004e\u004f\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005a\u005b\u005c\u005d\u005e\u005f\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006a\u006b\u006c\u006d\u006e\u006f\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007a\u007b\u007c\u007d\u007e\u1ea0\u1e04\u1e0c\u1eb8\u1e24\u1eca\u1e32\u1e36\u1e42\u1e46\u1ecc\u1e5a\u1e62\u1e6c\u1ee4\u1e7e\u1e88\u1ef4\u1e92\u1ea1\u1e05\u1e0d\u1eb9\u1e25\u1ecb\u1e33\u1e37\u1e43\u1e47\u1ecd\u1e5b\u1e63\u1e6d\u1ee5\u1e7f\u1e89\u1ef5\u1e93\u0226\u1e02\u010a\u1e0a\u0116\u1e1e\u0120\u1e22\u0130\u013f\u1e40\u1e44\u022e\u1e56\u1e58\u1e60\u1e6a\u1e86\u1e8a\u1e8e\u017b\u0227\u1e03\u010b\u1e0b\u0117\u1e1f\u0121\u1e23\u0140\u1e41\u1e45\u022f\u1e57\u1e59\u1e61\u1e6b\u1e87\u1e8b\u1e8f\u017c\u0181\u0187\u018a\u0191\u0193\u0198\u019d\u01a4\u01ac\u01b2\u0224\u0253\u0188\u0257\u0192\u0260\u0199\u0272\u01a5\u01ad\u028b\u0225\u00ab\u00bb\u2018\u2019\u201c\u201d\u0266\u0271\u02a0\u027c\u0282\u00a6\u00a9\u00ae\u00c6\u00c7\u00d1\u00d8\u00de\u00e6\u00e7\u00f1\u00f8\u00fe\u0131\u0237\u0020\u000a'


//----------------------------------------------------------------------------------------
var char_to_int = {};
(function(){for(var i = chars.length; i--;) char_to_int[chars[i]] = i })();


//----------------------------------------------------------------------------------------
var encode = function(string) {
    var r = ""
    for(var i = string.length; i--;)
        r = String.fromCharCode(char_to_int[string[i]]) + r;
    return r
}


//----------------------------------------------------------------------------------------
var decode = function(string) {
    var r = ""
    for(var i = string.length; i--;)
        r = chars.charAt(string[i].charCodeAt(i)) + r;
    return r
}


//----------------------------------------------------------------------------------------
var chars_regexified = '\\u00b0\\u00b9\\u00b2\\u00b3\\u2074\\u2075\\u2076\\u2077\\u2078\\u2079\\u00b6\\u00d7\\u00f7\\u207a\\u207b\\u207c\\u2260\\u2264\\u2265\\u2261\\u2248\\u207d\\u207e\\u221e\\u00bf\\u00a1\\u203c\\u2026\\u20ac\\u00a2\\u00a3\\u00a5\\u00a4\\u0021\\u0022\\u0023\\u0024\\u0025\\u0026\\u0027\\u0028\\u0029\\u002a\\u002b\\u002c\\u002d\\u002e\\u002f\\u0030\\u0031\\u0032\\u0033\\u0034\\u0035\\u0036\\u0037\\u0038\\u0039\\u003a\\u003b\\u003c\\u003d\\u003e\\u003f\\u0040\\u0041\\u0042\\u0043\\u0044\\u0045\\u0046\\u0047\\u0048\\u0049\\u004a\\u004b\\u004c\\u004d\\u004e\\u004f\\u0050\\u0051\\u0052\\u0053\\u0054\\u0055\\u0056\\u0057\\u0058\\u0059\\u005a\\u005b\\u005c\\u005d\\u005e\\u005f\\u0060\\u0061\\u0062\\u0063\\u0064\\u0065\\u0066\\u0067\\u0068\\u0069\\u006a\\u006b\\u006c\\u006d\\u006e\\u006f\\u0070\\u0071\\u0072\\u0073\\u0074\\u0075\\u0076\\u0077\\u0078\\u0079\\u007a\\u007b\\u007c\\u007d\\u007e\\u1ea0\\u1e04\\u1e0c\\u1eb8\\u1e24\\u1eca\\u1e32\\u1e36\\u1e42\\u1e46\\u1ecc\\u1e5a\\u1e62\\u1e6c\\u1ee4\\u1e7e\\u1e88\\u1ef4\\u1e92\\u1ea1\\u1e05\\u1e0d\\u1eb9\\u1e25\\u1ecb\\u1e33\\u1e37\\u1e43\\u1e47\\u1ecd\\u1e5b\\u1e63\\u1e6d\\u1ee5\\u1e7f\\u1e89\\u1ef5\\u1e93\\u0226\\u1e02\\u010a\\u1e0a\\u0116\\u1e1e\\u0120\\u1e22\\u0130\\u013f\\u1e40\\u1e44\\u022e\\u1e56\\u1e58\\u1e60\\u1e6a\\u1e86\\u1e8a\\u1e8e\\u017b\\u0227\\u1e03\\u010b\\u1e0b\\u0117\\u1e1f\\u0121\\u1e23\\u0140\\u1e41\\u1e45\\u022f\\u1e57\\u1e59\\u1e61\\u1e6b\\u1e87\\u1e8b\\u1e8f\\u017c\\u0181\\u0187\\u018a\\u0191\\u0193\\u0198\\u019d\\u01a4\\u01ac\\u01b2\\u0224\\u0253\\u0188\\u0257\\u0192\\u0260\\u0199\\u0272\\u01a5\\u01ad\\u028b\\u0225\\u00ab\\u00bb\\u2018\\u2019\\u201c\\u201d\\u0266\\u0271\\u02a0\\u027c\\u0282\\u00a6\\u00a9\\u00ae\\u00c6\\u00c7\\u00d1\\u00d8\\u00de\\u00e6\\u00e7\\u00f1\\u00f8\\u00fe\\u0131\\u0237\\u0020\\u000a'


//----------------------------------------------------------------------------------------
var printables = '\u00b6\u00a4\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003a\u003b\u003c\u003d\u003e\u003f\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004a\u004b\u004c\u004d\u004e\u004f\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005a\u005b\u005c\u005d\u005e\u005f\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006a\u006b\u006c\u006d\u006e\u006f\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007a\u007b\u007c\u007d\u007e'


//----------------------------------------------------------------------------------------
var printables_regexified = '\\u00b6\\u00a4\\u0021\\u0022\\u0023\\u0024\\u0025\\u0026\\u0027\\u0028\\u0029\\u002a\\u002b\\u002c\\u002d\\u002e\\u002f\\u0030\\u0031\\u0032\\u0033\\u0034\\u0035\\u0036\\u0037\\u0038\\u0039\\u003a\\u003b\\u003c\\u003d\\u003e\\u003f\\u0040\\u0041\\u0042\\u0043\\u0044\\u0045\\u0046\\u0047\\u0048\\u0049\\u004a\\u004b\\u004c\\u004d\\u004e\\u004f\\u0050\\u0051\\u0052\\u0053\\u0054\\u0055\\u0056\\u0057\\u0058\\u0059\\u005a\\u005b\\u005c\\u005d\\u005e\\u005f\\u0060\\u0061\\u0062\\u0063\\u0064\\u0065\\u0066\\u0067\\u0068\\u0069\\u006a\\u006b\\u006c\\u006d\\u006e\\u006f\\u0070\\u0071\\u0072\\u0073\\u0074\\u0075\\u0076\\u0077\\u0078\\u0079\\u007a\\u007b\\u007c\\u007d\\u007e'


//----------------------------------------------------------------------------------------
var compressables = '\u00f0\u00ac\u00b6\u00a4\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003a\u003b\u003c\u003d\u003e\u003f\u0040\u0041\u0042\u0043\u0044\u0045\u0046\u0047\u0048\u0049\u004a\u004b\u004c\u004d\u004e\u004f\u0050\u0051\u0052\u0053\u0054\u0055\u0056\u0057\u0058\u0059\u005a\u005b\u005c\u005d\u005e\u005f\u0060\u0061\u0062\u0063\u0064\u0065\u0066\u0067\u0068\u0069\u006a\u006b\u006c\u006d\u006e\u006f\u0070\u0071\u0072\u0073\u0074\u0075\u0076\u0077\u0078\u0079\u007a\u007b\u007c\u007d\u007e\u1ea0\u1e04\u1e0c\u1eb8\u1e24\u1eca\u1e32\u1e36\u1e42\u1e46\u1ecc\u1e5a\u1e62\u1e6c\u1ee4\u1e7e\u1e88\u1ef4\u1e92\u0226\u1e02\u010a\u1e0a\u0116\u1e1e\u0120\u1e22\u0130\u013f\u1e40\u1e44\u022e\u1e56\u1e58\u1e60\u1e6a\u1e86\u1e8a\u1e8e\u017b\u1ea1\u1e05\u1e0d\u1eb9\u1e25\u1ecb\u1e33\u1e37\u1e43\u1e47\u1ecd\u1e5b\u1e63\u1e6d\u1ee5\u1e7f\u1e89\u1ef5\u1e93\u0227\u1e03\u010b\u1e0b\u0117\u1e1f\u0121\u1e23\u0140\u1e41\u1e45\u022f\u1e57\u1e59\u1e61\u1e6b\u1e87\u1e8b\u1e8f\u017c\u0181\u0187\u018a\u0191\u0193\u0198\u019d\u01a4\u01ac\u01b2\u0224\u0253\u0188\u0257\u0192\u0260\u0266\u0199\u0271';


//----------------------------------------------------------------------------------------
var compressables_regexified = '\\u00f0\\u00ac\\u00b6\\u00a4\\u0021\\u0022\\u0023\\u0024\\u0025\\u0026\\u0027\\u0028\\u0029\\u002a\\u002b\\u002c\\u002d\\u002e\\u002f\\u0030\\u0031\\u0032\\u0033\\u0034\\u0035\\u0036\\u0037\\u0038\\u0039\\u003a\\u003b\\u003c\\u003d\\u003e\\u003f\\u0040\\u0041\\u0042\\u0043\\u0044\\u0045\\u0046\\u0047\\u0048\\u0049\\u004a\\u004b\\u004c\\u004d\\u004e\\u004f\\u0050\\u0051\\u0052\\u0053\\u0054\\u0055\\u0056\\u0057\\u0058\\u0059\\u005a\\u005b\\u005c\\u005d\\u005e\\u005f\\u0060\\u0061\\u0062\\u0063\\u0064\\u0065\\u0066\\u0067\\u0068\\u0069\\u006a\\u006b\\u006c\\u006d\\u006e\\u006f\\u0070\\u0071\\u0072\\u0073\\u0074\\u0075\\u0076\\u0077\\u0078\\u0079\\u007a\\u007b\\u007c\\u007d\\u007e\\u1ea0\\u1e04\\u1e0c\\u1eb8\\u1e24\\u1eca\\u1e32\\u1e36\\u1e42\\u1e46\\u1ecc\\u1e5a\\u1e62\\u1e6c\\u1ee4\\u1e7e\\u1e88\\u1ef4\\u1e92\\u0226\\u1e02\\u010a\\u1e0a\\u0116\\u1e1e\\u0120\\u1e22\\u0130\\u013f\\u1e40\\u1e44\\u022e\\u1e56\\u1e58\\u1e60\\u1e6a\\u1e86\\u1e8a\\u1e8e\\u017b\\u1ea1\\u1e05\\u1e0d\\u1eb9\\u1e25\\u1ecb\\u1e33\\u1e37\\u1e43\\u1e47\\u1ecd\\u1e5b\\u1e63\\u1e6d\\u1ee5\\u1e7f\\u1e89\\u1ef5\\u1e93\\u0227\\u1e03\\u010b\\u1e0b\\u0117\\u1e1f\\u0121\\u1e23\\u0140\\u1e41\\u1e45\\u022f\\u1e57\\u1e59\\u1e61\\u1e6b\\u1e87\\u1e8b\\u1e8f\\u017c\\u0181\\u0187\\u018a\\u0191\\u0193\\u0198\\u019d\\u01a4\\u01ac\\u01b2\\u0224\\u0253\\u0188\\u0257\\u0192\\u0260\\u0266\\u0199\\u0271';


//----------------------------------------------------------------------------------------
var tiny_digits = '\u00b0\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079';


//----------------------------------------------------------------------------------------
var tiny_digits_regexified = '\\u00b0\\u00b9\\u00b2\\u00b3\\u2074\\u2075\\u2076\\u2077\\u2078\\u2079';


//----------------------------------------------------------------------------------------
var correct = function(char) { return char.charAt(char.length - 1) }


//----------------------------------------------------------------------------------------
var is_char = function(char) { return char_to_int[char] !== undefined }


//----------------------------------------------------------------------------------------
var is_printable = function(char) {
    char = char_to_int[char]
    return char !== undefined && 0 <= char && char < 98
}


//----------------------------------------------------------------------------------------
var is_tiny_digit = function(char) {
    char = char_to_int[char]
    return char !== undefined && 239 <= char && char < 249
}


//----------------------------------------------------------------------------------------
var digit_to_tiny = {
    "0": tiny_digits[0],
    "1": tiny_digits[1],
    "2": tiny_digits[2],
    "3": tiny_digits[3],
    "4": tiny_digits[4],
    "5": tiny_digits[5],
    "6": tiny_digits[6],
    "7": tiny_digits[7],
    "8": tiny_digits[8],
    "9": tiny_digits[9],
}


//----------------------------------------------------------------------------------------
var tiny_to_digit = {};
(function(){for(var i = tiny_digits.length; i--;) tiny_to_digit[i+""] = tiny_digits[i] })()


//----------------------------------------------------------------------------------------
var bitify_char = function(char) {
    var a = [], v = '0000000' + characters.char_to_int(char).toString(2);
    v = v.substr(v.length-8)
    for(var i = v.length; i--;) a.unshift(+v[i]);
    return a
}


//----------------------------------------------------------------------------------------
var bitify_string = function(string) {
    var a = [];
    for(var i = 0, l = string.length; i < l; ++i)
        a = a.concat(bitify_char(string[i]))
    return a
}


//----------------------------------------------------------------------------------------
var debitify_char = function(array) {
    return chars.charAt(parseInt(array.join(""), 2));
}


//----------------------------------------------------------------------------------------
var debitify_string = function(array) {
    var s = ""
    for(var i = 0, l = array.length; i < l; i += 8)
        s += debitify_char(array.slice(i, i+8))
    return s
}


//----------------------------------------------------------------------------------------
function pad_n(num, n, c)
{
    var s = "" + num;
    var m = s.length;
    while(s.length < n) s = c + s;
    return s.substr(m);
}


//----------------------------------------------------------------------------------------
function pad0_n(num, n)
{
    var s = "" + num;
    var m = s.length;
    while(s.length < n) s = "0" + s;
    return s.substr(m);
}


//----------------------------------------------------------------------------------------
function pad0_max(num, n)
{
    // 60 is the current speed max.
    var s = "000000000000000000000000000000000000000000000000000000000000" + num;
    return s.substr(s.length - n);
}


//----------------------------------------------------------------------------------------
function pad0_4(num)
{
    var s = "0000" + num;
    return s.substr(s.length - 4);
}


//----------------------------------------------------------------------------------------
global.characters = {
    encode: encode,
    decode: decode,
    chars: chars,
    chars_regexified: chars_regexified,
    printables: printables,
    printables_regexified: printables_regexified,
    compressables: compressables,
    compressables_regexified: compressables_regexified,
    tiny_digits: tiny_digits,
    tiny_digits_regexified: tiny_digits_regexified,
    is_char: is_char,
    is_printable: is_printable,
    is_printable: is_printable,
    is_tiny_digit: is_tiny_digit,
    int_to_char: function(i) { return chars.charAt(i) },
    char_to_int: function(char) { return char_to_int[char] },
    tiny_to_number: function(string) {
        var result = ""
        for(var i = string.length; i--;)
            result = tiny_to_digit[string[i]] + result
        return result
    },
    number_to_tiny: function(string) {
        var result = ""
        for(var i = string.length; i--;)
            result = digit_to_tiny[string[i]] + result
        return result
    },
    bitify_char: bitify_char,
    bitify_string: bitify_string,
    debitify_char: debitify_char,
    debitify_string: debitify_string,
    pad_n: pad_n,
}


})(this);
