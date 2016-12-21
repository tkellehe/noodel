(function(global, $, noodel, STRING, char_codes){

var nbs = String.fromCharCode(160),
    space = String.fromCharCode(32);
  
var nbsRemoveRegex = new RegExp(nbs,"g");
function nbsRemove(string) {
  return string.replace(nbsRemoveRegex, space);
};
var nbsAddRegex = new RegExp(space,"g");
function nbsAdd(string) {
  return string.replace(nbsAddRegex, nbs);
};
    
function HtmlEncode(string) {
  var el = document.createElement("div");
  el.innerText = string;
  return el.innerHTML;
};
function HtmlDecode(string) {
  var el = document.createElement("div");
  el.innerHTML = string;
  return el.innerText;
};

global.forceReload = function() { window.location.reload(true) };
  
$(function(){

/// Handle all editors in the window.
$(".noodel-exec").each(function(){
  var $this   = $(this),
      $editor = $($this.children(".noodel-editor")[0]),
      $input  = $($this.children(".noodel-input")[0]),
      $output = $($this.children(".noodel-output")[0]),
      $button = $($this.children("button")[0]),
      $chars  = $($this.children(".noodel-chars")[0]);
  
  $output.prop("readonly",true);
  $button.text("RUN");
  
  var prgm;
    
  function clickRun() {
    prgm = noodel(nbsRemove($editor.val()));
    if(prgm === undefined) return;
    
    var i = nbsRemove($input.val());
    if(i.length) prgm.inputs.back(new STRING(i));
    
    $input.prop("readonly",true);
    $editor.prop("readonly",true);
    
    prgm.onstep = function() {
      $output.val(prgm.printify());
    }
    prgm.onend = function() {
      $output.val(prgm.printify());
      clickStop();
    }
    prgm.onstart = function() {
      $button.text("STOP").unbind("click").click(clickStop);
    }
    
    prgm.exec();
  };
  function clickStop() {
    prgm.stop();
    
    $input.prop("readonly",false);
    $editor.prop("readonly",false);
    
    $button.text("RUN").unbind("click").click(clickRun);
  };
  
  $button.click(clickRun);
    
  var $bs = $("<a href=''>bs</a>");
  $bs.click(function(e){
    e.preventDefault();
    $editor.val($editor.val().slice(0,$editor.val().length-1));
  });
  $chars.append($bs);
    
  for(var i = 0; i < char_codes.length; ++i) {(function(){
    var char = nbsRemove(char_codes[i]),
        echar = nbsAdd(char_codes[i]);
    if(char === "\n") echar = "\\n";
    else if(char === "\t") echar = "\\t";
    var $letter = $("<a href=''>"+HtmlEncode(echar)+"</a>");
    $letter.click(function(e){
      e.preventDefault();
      $editor.val($editor.val() + char);
    });
    $chars.append($letter);
  })()}
});


});

})(this, this.$, this.noodel, this.types.STRING, this.char_codes)
