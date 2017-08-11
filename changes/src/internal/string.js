(function(global, characters){


//----------------------------------------------------------------------------------------
function STRING(obj) {
    this.type = "STRING";
    this.is_noodel_type = true;
    this.value = obj === undefined || obj.toString === undefined ? "" : obj.toString();
    this.props = {};
}


//////////////////////////////////////////////////////////////////////////////////////////
/// These functions return the most primitive representation of the type.
//----------------------------------------------------------------------------------------
STRING.prototype.toString = function() {
    return this.value.toString.apply(this.value, Array.prototype.slice.call(arguments));
}


//----------------------------------------------------------------------------------------
STRING.prototype.toNumber = function() {
    return this.value.valueOf.apply(this.value, Array.prototype.slice.call(arguments));
}


//----------------------------------------------------------------------------------------
STRING.prototype.toArray = function() {
    return characters.char_array(this.value);
}
//////////////////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------------------
STRING.prototype.add_onto_the_right = function(other) {
    return new STRING(this.value + other.toString());
}


//----------------------------------------------------------------------------------------
STRING.prototype.add_onto_the_left = function(other) {
    return new STRING(other.toString() + this.value);
}


//----------------------------------------------------------------------------------------
STRING.prototype.remove_from_the_right = function(other) {
    return new STRING(this.value.replace(other.toString(), ""));
}


//----------------------------------------------------------------------------------------
STRING.prototype.remove_from_the_left = function(other) {
    // This is done such that is removed in the same as the other.
    return new STRING(characters.reverse_string(characters.reverse_string(this.value).replace(characters.reverse_string(other.toString()), "")));
}


//----------------------------------------------------------------------------------------
global.STRING = STRING;


})(this, this.characters);
