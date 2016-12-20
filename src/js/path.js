(function(global, Pipe, Command, Token){

function Path(code) {
  this.code = code;
  this.start = new Token(0, this.code, undefined);
  this.current = this.start;
  this.end = this.start.tokenize();
  this.onstep = function() {};
  this.onend = function() {};
}

Path.prototype.step = function() {
  this.current.cmd.exec();
  this.current = this.current.next();
  this.onstep();
  return !!this.current;
}

Path.prototype.stop = function() {

}

Path.prototype.exec = function() {
  this.stop();
}

})(this, this.Pipe, this.Command, this.Token)
