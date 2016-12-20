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
  
  $button.text("RUN");
  
  function clickRun() {
    
    $button.text("STOP").unbind("click").click(clickStop);
  };
  function clickStop() {
    
    $button.text("STOP").unbind("click").click(clickRun);
  };
  
  $button.click(clickRun);
});


});

})(this, this.$, this.noodel)
