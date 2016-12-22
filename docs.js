(function(global, $, noodel, STRING, char_codes){

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

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
      $chars  = $($this.children(".noodel-chars")[0]),
      $bytes  = $($this.children("p")[0]);
  
  /// Code Execution.
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
  
  /// Character selector.
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
      var text = $editor.val(), pos = $editor.getCursorPosition();
      $editor.val(text.slice(0, pos) + char + text.slice(pos, text.length));
    });
    $chars.append($letter);
  })()}
    
  /// Byte Count
  $editor.on("input", function() { $bytes.text($editor.val().length) });
    
}); // End of .noodel-exec regions.

});

})(this, this.$, this.noodel, this.types.STRING, this.char_codes)
