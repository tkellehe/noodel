(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Type cast operations.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"'"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.access(i).stringify();
        }
        this.tkn.outputs.back(f);
      } else {
        this.tkn.outputs.back(f.stringify());
      }
    } else {
      noodel.make_error(new STRING("¤Expected¤something¤in¤the¤pipe."), path);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Numberifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"#"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.access(i).numberify();
        }
        this.tkn.outputs.back(f);
      } else {
        this.tkn.outputs.back(f.numberify());
      }
    } else {
      noodel.make_error(new STRING("¤Expected¤something¤in¤the¤pipe."), path);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Arrayifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ʋ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var t = f.arrayify();
      if(f.type === "STRING") {
        if(t.length() === 1) {
          var a = [];
          for(var i = 0; i < f.value.length; ++i) {
            a.push(new STRING(f.value[i]));
          }
          t = new ARRAY(a);
        }
      }
      this.tkn.outputs.back(t);
    } else {
      noodel.make_error(new STRING("¤Expected¤something¤in¤the¤pipe."), path);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Collects all of the items in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("œ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var pipe = new Pipe();
    pipe.pipe(this.tkn.inputs);
    if(pipe.length()) {
      this.tkn.outputs.back(new ARRAY(pipe.__array__));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified by the count and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("œ"), "\\d+"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = [];
    for(var i = +this.tkn.params[0]; i-- && this.tkn.inputs.length();) a.push(this.tkn.inputs.front());
    if(a.length) {
      this.tkn.outputs.back(new ARRAY(a));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("œ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(!f) {
      noodel.make_error(new STRING("Failed¤to¤find¤anything¤in¤the¤pipe."), path);
      return;
    }
    
    var a = [];
    for(var i = f.integerify().valueify(); i-- && this.tkn.inputs.length();) a.push(this.tkn.inputs.front());
    if(a.length) {
      this.tkn.outputs.back(new ARRAY(a));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
