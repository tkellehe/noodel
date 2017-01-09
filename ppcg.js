(function(){

var html_noodel = document.getElementById("noodel");

var input = html_noodel.getAttribute("input"),
    code = html_noodel.getAttribute("code");
    
var nbs = String.fromCharCode(160),
    space = String.fromCharCode(32);
  
var nbsRemoveRegex = new RegExp(nbs,"g");
function nbsRemove(string) {
  if(!string) return "";
  return string.replace(nbsRemoveRegex, space);
};

input = nbsRemove(input);
input = eval("(function(){ return " + (input.length ? input : "undefined") + "})()");

code = nbsRemove(code);
var prgm = noodel(code, input);

var output = document.createElement("textarea");
output.cols = html_noodel.getAttribute("cols");
output.rows = html_noodel.getAttribute("rows");

prgm.onstep = function() {
  output.value = prgm.printify();
}
prgm.onend = function() {
  output.value = prgm.printify();
}

})()
