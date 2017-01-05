(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

Path.prototype.printify = function() {
  var r = (new ARRAY(this.stdout.__array__)).printify();
  
  var blocks = r.split(characters.correct("ð")), rows = [];
  for(var i = 0; i < blocks.length; ++i) {
    var block = blocks[i], row = 0;
    for(var j = 0; j < block.length; ++j) {
      if(rows[row] === undefined) rows[row] = "";
      if(block[j] === characters.correct("¬")) row++;
      else rows[row] += block[j];
    }
  }
  
  r = (rows[0] === undefined ? "" : rows[0]);
  for(var i = 1; i < rows.length; ++i) r += "\n" + (rows[i] === undefined ? "" : rows[i]);
  
  return r;
}
  
global.noodel = function noodel(code) {
  if(typeof code === "string" && code.length) {
    var path = new Path(code);
    path.stack = new ARRAY();
    path.onstart = function() { while(this.stdin.first()) this.top(this.stdin.front()) };
    path.onend = function() { this.stdout.back(this.top()) };
    
    return path;
  }
};
noodel.commandify = function(cmd) {
  if(arguments.length > 1)
    cmd = Array.prototype.join.call(arguments, ")(");
  return new RegExp("^(" + cmd + ")$");
};
  
noodel.make_error = function(o, path) {
  path.exceptions.back(new STRING("¶[EXCEPTION]:")).back(o);
};
  
noodel.random = function(min, max) {
  return ((max - min) * Math.random()) + min
};
  
noodel.random_int = function(min, max) {
  return Math.floor(noodel.random(min, max))
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(0, noodel.commandify("[ \t\n]"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = noodel.in_to_out;
});

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
