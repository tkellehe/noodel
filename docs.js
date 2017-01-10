(function(global, $, noodel, STRING, NUMBER, ARRAY, characters){

var nbs = String.fromCharCode(160),
    space = String.fromCharCode(32);
  
var nbsRemoveRegex = new RegExp(nbs,"g");
function nbsRemove(string) {
  if(!string) return "";
  return string.replace(nbsRemoveRegex, space);
};
var nbsAddRegex = new RegExp(space,"g");
function nbsAdd(string) {
  if(!string) return "";
  return string.replace(nbsAddRegex, nbs);
};
  
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
      $this.attr("cursor_pos", pos < 0 ? 0 : (pos < l ? pos : l));
      return this;
    } else {
      pos = +$this.attr("cursor_pos");
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
  $.makeUrl = function(params) {
    return window.location.href.replace(window.location.search,'') + "?" + $.param(params);
  };
  $.getUrlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
      return results[1] || "";
    }
  };
  $.getUrlParamDecoded = function(name) {
    var result = $.getUrlParam(name);
    if(result !== undefined) return nbsRemove(decodeURIComponent(result));
    return "";
  };
})(jQuery);

    
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
      $editor = $('<textarea wrap="off" class="noodel-editor"></textarea>'),
      $input  = $('<textarea wrap="off" class="noodel-input"></textarea>'),
      $output = $('<textarea wrap="off" class="noodel-output"></textarea>'),
      $button = $('<button></button>'),
      $chars  = $('<div class="noodel-chars" hidden><center></center></div>'),
      $bytes  = $('<p></p>'),
      $toggle = $("<center><a href=''>code pad</a></center>"),
      $container = $("<div hidden></div>"),
      $hider = $("<center><a href=''>editor</a></center>");
  
  if($this.attr("show") !== undefined) $container.prop("hidden", false);
  
  $this.append($hider).append($container);
  $container.append($bytes).append($editor).append($toggle).append($chars).append($button).append($input).append($output);
  
  $hider.click(function(e){
    e.preventDefault();
    $container.slideToggle(400);
  });
  
  $editor.val($this.attr("code"));
  $input.val($this.attr("input"));
  
  $editor.focus(function(){
    $editor.cursorPos($editor.getCursorPosition());
  }).click(function(){
    $editor.cursorPos($editor.getCursorPosition());
  }).keydown(function(){
    $editor.cursorPos($editor.getCursorPosition());
  });
  $editor.cursorPos(0);
  
  /// Code Execution.
  $output.prop("readonly",true);
  $button.text("RUN");
  
  var prgm;
    
  function clickRun() { 
    $button.text("LOADING INPUTS...");
    var temp_string = nbsRemove($input.val());
    var js_inputs = eval("(function(){return "+(temp_string.length ? temp_string : "undefined")+";})()");
    
    $button.text("PARSING...");
    prgm = noodel(nbsRemove($editor.val()), js_inputs);
    if(prgm === undefined) return;
    
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
  if($this.attr("run") !== undefined) $button.trigger("click");
  
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

$(".noodel-share").each(function(){
  var $this = $(this),
      $container = $("<div></div>"),
      $share = $("<button class='noodel-share-button'>share</button>"),
      $cb_run = $("<input type='checkbox'>Start script running.</input>");
  $container.append($share).append($cb_run);
  $this.append($container);
  
  // Must be at least one editor.
  var $editor = $($(".noodel-exec")[0]),
      $input = $($(".noodel-exec div .noodel-input")[0]),
      $button = $($(".noodel-exec div button")[0]),
      $code = $($(".noodel-exec div .noodel-editor")[0]);
  
  $share.click(function(){
    var url = $.makeUrl({code:nbsRemove($code.val()), input:nbsRemove($input.val()),
                         run:$cb_run.prop("checked")});
    window.location.href = url;
  });
  
  $code.val(nbsAdd($.getUrlParamDecoded("code")));
  $code.trigger("input");
  $input.val(nbsAdd($.getUrlParamDecoded("input")));
  if($.getUrlParam("run") === "true") {
    $cb_run.prop("checked", true);
    $button.trigger("click");
  }
  
}); // End of .noodel-share regions.

$(".noodel-char_table").each(function(){
  var $this = $(this),
      $container = $("<center></center>");
  $this.append($container);
  
  for(var i = 0; i < characters.chars.length; ++i) {(function(){
    var char = nbsRemove(characters.chars[i]),
        echar = nbsAdd(characters.chars[i]);
    if(char === "\n") {
      var $letter = $("<span>&#8629;</span>");
    } else {
      var $letter = $("<span>"+HtmlEncode(echar)+"</span>");
    }
    if((i+1) % 16) $container.append($letter);
    else $container.append($letter).append("<br>");
  })()}
  
}); // End of .noodel-char_table regions.
    
}); // End of the onload function.

})(this, this.$, this.noodel, this.STRING, this.NUMBER, this.ARRAY, this.characters)
