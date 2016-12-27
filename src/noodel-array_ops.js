(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Array Based Operators
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Flattens that particular data type (for arrays places into elements, strings turned into char arrays
/// and numbers into integers.
Command.add(noodel.commandify("_"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.value.length; ++i) this.tkn.outputs.back(f.value[i]);
      } else if(f.type === "NUMBER") {
        this.tkn.outputs.back(f.integerify());
      } else if(f.type === "STRING") {
        this.tkn.outputs.back(f.arrayify());
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Takes the first element of strings/arrays and places it into the back. For numbers, it reciprocals.
Command.add(noodel.commandify("ẹ"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.shift();
        if(e) f.value.push(e);
        this.tkn.outputs.back(f);
      } else if(f.type === "NUMBER") {
        this.tkn.outputs.back(new NUMBER(1/f.valueify()));
      } else if(f.type === "STRING") {
        var s = f.valueify();
        this.tkn.outputs.back(new STRING(s.slice(1, s.length) + s.slice(0, 1)));
      }
    } else this.tkn.inputs.front(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(noodel.commandify("ạ"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var index = undefined, saved;
      if(f.type === "NUMBER")
      {
        index = f.valueify();
        saved = f;
        f = this.tkn.inputs.front();
        if(!f) return;
      }
      
      if(f.type === "STRING" || f.type === "ARRAY") {
        if(f.frame === undefined) f.frame = index;
        if(f.frame === undefined) f.frame = 0;
        this.tkn.outputs.back(f.access(f.frame));
        f.frame = (f.frame + 1) % f.length();
        if(saved !== undefined) {
          this.tkn.outputs.back(saved);
        }
        this.tkn.outputs.back(f);
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
