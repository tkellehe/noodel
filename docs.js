(function(global, $, noodel, STRING){

var nbs = String.fromCharCode(160),
    space = String.fromCharCode(32);
  
var nbsRemoveRegex = new RegExp(String.fromCharCode(160),"g");
function nbsRemove(string) {
  return string.replace(nbsRemoveRegex, space);
};
var nbsAddRegex = new RegExp(space,"g");
function nbsAdd(string) {
  return string.replace(nbsAddRegex, nbs);
};
  
$(function(){

/// Handle all editors in the window.
$(".noodel-exec").each(function(){
  var $this = $(this),
      $editor = $($this.children(".noodel-editor")[0]),
      $input = $($this.children(".noodel-input")[0]),
      $output = $($this.children(".noodel-output")[0]),
      $button = $($this.children("button")[0]);
  
  $output.prop("readonly",true);
  $button.text("RUN");
  
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
});


});

})(this, this.$, this.noodel, this.types.STRING)
