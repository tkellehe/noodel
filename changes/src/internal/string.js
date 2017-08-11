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
STRING.prototype.add_item_onto_the_right = function(item) {
    return new STRING(this.value + item.toString());
}


//----------------------------------------------------------------------------------------
STRING.prototype.add_item_onto_the_left = function(item) {
    return new STRING(item.toString() + this.value);
}


//----------------------------------------------------------------------------------------
STRING.prototype.remove_item_from_the_right = function(item) {
    // This is done such that is removed in the same as the item.
    return new STRING(characters.reverse_string(characters.reverse_string(this.value).replace(characters.reverse_string(item.toString()), "")));
}


//----------------------------------------------------------------------------------------
STRING.prototype.remove_item_from_the_left = function(item) {
    return new STRING(this.value.replace(item.toString(), ""));
}


//----------------------------------------------------------------------------------------
global.STRING = STRING;


})(this, this.characters);
