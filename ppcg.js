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

output.style.color = "white";
output.style.backgroundColor = "black";
output.style.outline = "none";
    
prgm.onstep = function() {
  output.value = prgm.printify();
  output.scrollTop = output.scrollHeight;
}
prgm.onend = function() {
  output.value = prgm.printify();
  output.scrollTop = output.scrollHeight;
}

html_noodel.appendChild(output);
prgm.exec();

})()
