(function(global, $, noodel, STRING, characters){

(function ($) {
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
  };
  $.fn.cursorPos = function(pos) {
    if(pos !== undefined) {
      var l = $(this).val().length;
      this.cursor_pos = pos < 0 ? 0 : (pos < l ? pos : (l-1));
      return this;
    } else {
      return this.cursor_pos ? this.cursor_pos : 0;
    }
  };
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
      $editor = $('<textarea class="noodel-editor"></textarea>'),
      $input  = $('<textarea class="noodel-input"></textarea>'),
      $output = $('<textarea class="noodel-output"></textarea>'),
      $button = $('<button></button>'),
      $chars  = $('<div class="noodel-chars" hidden><center></center></div>'),
      $bytes  = $('<p></p>'),
      $toggle = $("<center><a href=''>code pad</a></center>");
  
  $this.append($bytes).append($editor).append($toggle).append($chars).append($button).append($input).append($output);
  
  $editor.focus(function(){
    $editor.cursorPos($editor.getCursorPosition());
  });
  $editor.cursorPos(0);
  
  /// Code Execution.
  $output.prop("readonly",true);
  $button.text("RUN");
  
  var prgm;
    
  function clickRun() {
    prgm = noodel(nbsRemove($editor.val()));
    if(prgm === undefined) return;
    
    var i = characters.deprintify_string(nbsRemove($input.val()));
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
  (function(c){ 
    $toggle.click(function(e) {
      e.preventDefault();
      c.toggle(400);
    });
  })($chars);
  
  $chars = $($chars.children("center")[0]);
  
  var $bs = $("<a href=''>bs</a>");
  $bs.click(function(e){
    e.preventDefault();
    $editor.trigger("focus");
    var t = $editor.val();
    $editor.val(t.slice(0,$editor.cursorPos()) + t.slice($editor.cursorPos(), t.length));
    $editor.trigger("input");
  });
  
  var $larrow = $("<a href=''>&larr;</a>");
  $larrow.click(function(e){
    e.preventDefault();
    $editor.trigger("focus");
    $editor.cursorPos($editor.cursorPos()-1);
  });
  var $rarrow = $("<a href=''>&rarr;</a>");
  $rarrow.click(function(e){
    e.preventDefault();
    $editor.trigger("focus");
    $editor.cursorPos($editor.cursorPos()+1);
  });
    
  $chars.append($larrow).append($bs).append($rarrow).append("<br>");
    
  for(var i = 0; i < characters.chars.length; ++i) {(function(){
    var char = nbsRemove(characters.chars[i]),
        echar = nbsAdd(characters.chars[i]);
    if(char === "\n") echar = "\\n";
    else if(char === "\t") echar = "\\t";
    var $letter = $("<a href=''>"+HtmlEncode(echar)+"</a>");
    $letter.click(function(e){
      e.preventDefault();
      var text = $editor.val(), pos = $editor.cursorPos();
      $editor.val(text.slice(0, pos) + char + text.slice(pos, text.length));
      $editor.trigger("input");
    });
    if((i+1) % 16) $chars.append($letter);
    else $chars.append($letter).append("<br>");
  })()}
    
  /// Byte Count
  $bytes.text($editor.val().length + " bytes");
  $editor.on("input", function() { $bytes.text($editor.val().length + " bytes") });
    
}); // End of .noodel-exec regions.

});

})(this, this.$, this.noodel, this.types.STRING, this.characters)
