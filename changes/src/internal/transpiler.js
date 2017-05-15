(function(global){


//----------------------------------------------------------------------------------------
var REGEXIFY = function(string) { return new RegExp("^" + string + "$") }


//----------------------------------------------------------------------------------------
global.transpiler = {
    REGEXIFY: REGEXIFY
};

})(this);