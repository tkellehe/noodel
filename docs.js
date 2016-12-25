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
    var $this = $(this);
    if(pos !== undefined) {
      var l = $this.val().length;
      $this.prop("cursor_pos", pos < 0 ? 0 : (pos < l ? pos : l));
      return this;
    } else {
      pos = $this.prop("cursor_pos");
      return pos ? pos : 0;
    }
  };
  $.fn.typeInput = function(char) {
    var $this = $(this);
    var text = $this.val(), pos = $this.cursorPos();
    $this.val(text.slice(0, pos) + char + text.slice(pos, text.length));
    $this.cursorPos(pos+char.length);
    $this.trigger("input");
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
      c.slideToggle(400);
    });
  })($chars);
  
  $chars = $($chars.children("center")[0]);
  
  var $bs = $("<a href=''>bs</a>");
  $bs.click(function(e){
    e.preventDefault();
    var t = $editor.val(), pos = $editor.cursorPos();
    if(pos > 0) {
      $editor.val(t.slice(0,pos-1) + t.slice(pos, t.length));
      $editor.cursorPos(pos - 1);
      $editor.trigger("input");
    }
  });
  
  var $larrow = $("<a href=''>&larr;</a>");
  $larrow.click(function(e){
    e.preventDefault();
    $editor.cursorPos($editor.cursorPos()-1);
  });
  var $rarrow = $("<a href=''>&rarr;</a>");
  $rarrow.click(function(e){
    e.preventDefault();
    $editor.cursorPos($editor.cursorPos()+1);
  });
    
  $chars.append($larrow).append($bs).append($rarrow).append("<br>");
    
  for(var i = 0; i < characters.chars.length; ++i) {(function(){
    var char = nbsRemove(characters.chars[i]),
        echar = nbsAdd(characters.chars[i]);
      if(char === "\n") {
        var $letter = $("<a href=''>&#8629;</a>");
      } else {
        var $letter = $("<a href=''>"+HtmlEncode(echar)+"</a>");
      }
      $letter.click(function(e){
      e.preventDefault();
      $editor.typeInput(char);
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
