(function(global, characters){


//----------------------------------------------------------------------------------------
var to_base95 = function(x) {
    x = Math.abs(x)
    if(x == 0)
        return characters.printables[0]
    var digits = []
    while(x) {
        digits.push(characters.printables[x % 95])
        x = Math.floor(x /= 95)
    }
    digits.reverse()
    return digits.join("")
}


//----------------------------------------------------------------------------------------
var from_base95 = function(s) {
    var x = 0;
    for(var i = 0, l = s.length; i < l; ++i)
        x += characters.char_to_int(s[l - i - 1]) * Math.pow(95, i);
    return x;
}


//----------------------------------------------------------------------------------------
global.base95 = {
    to: to_base95,
    from: from_base95
}


})(this, this.characters)