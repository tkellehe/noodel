(function(global, Pipe, Command, Token, Path, CHAR, NUMBER, STRING, ARRAY){

function move_inputs(tkn, path) {
  tkn.outputs.pipe(tkn.inputs);
}

/// NOPs
Commands.commands[" "] = function(cmd) {};

global.noodel = function noodel(code) { if(typeof code === "string") return new Path(code) };

})(this, this.Pipe, this.Command, this.Token, this.Path, this.types.CHAR, this.types.NUMBER, this.types.STRING
