(function(global, characters){


//----------------------------------------------------------------------------------------
var to_base98 = function(x) {
    x = Math.abs(x)
    if(x == 0)
        return characters.int_to_char(0)
    var digits = []
    while(x) {
        digits.push(characters.int_to_char(x % 98))
        x = Math.floor(x /= 98)
    }
    digits.reverse()
    return digits.join("")
}


//----------------------------------------------------------------------------------------
var from_base98 = function(s) {
    var x = 0;
    for(var i = 0, l = s.length; i < l; ++i)
        x += characters.char_to_int(s[l - i - 1]) * Math.pow(98, i);
    return x;
}


//----------------------------------------------------------------------------------------
global.base98 = {
    to: to_base98,
    from: from_base98
}


})(this, this.characters)