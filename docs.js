(function(global, $, noodel){

var nbs = String.fromCharCode(160);
  
var nbsRemoveRegex = new RegExp(nbs,"g");
function nbsRemove(string) {
  return string.replace(nbsRemoveRegex, " ");
};
var nbsAddRegex = new RegExp(" ","g");
function nbsRemove(string) {
  return string.replace(nbsAddRegex, nbs);
};
  
$(function(){

/// Handle all editors in the window.
$(".noodel-exec").each(function(){
  var $this = $(this),
      $editor = $($this.children(".noodel-editor")[0]),
      $input = $($this.children(".noodel-editor")[0]),
      $output = $($this.children(".noodel-editor")[0]),
      $button = $($this.children("button")[0]);
  
  $output.prop("readonly",true);
  $button.text("RUN");
  
  function clickRun() {
    prgm = noodel(nbsRemove($editor.val()));
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
    
    prgm.exec();
    
    $button.text("STOP").unbind("click").click(clickStop);
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

})(this, this.$, this.noodel)
