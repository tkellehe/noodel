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
        for(var i = 0; i < f.value.length; ++i) this.tkn.outputs.back(new STRING(f.value[i]));
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
/// Gets magnitude of that particular data type.
Command.add(noodel.commandify("l"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "NUMBER") {
        this.tkn.outputs.back(new NUMBER(Math.abs(f.valueify())));
      } else if(f.type === "STRING" || f.type === "ARRAY") {
        this.tkn.outputs.back(new NUMBER(f.length()));
        this.tkn.outputs.back(f);
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Takes the first element of strings/arrays and places it into the back. For numbers, it reciprocates.
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
        var a = f.arrayify();
        for(var i = 0; i < a.length(); ++i) {
          var s = a.value[i].value.split(characters.correct("¬"));
          for(var j = 0; j < s.length(); ++j) {
            var t = s[j];
            s[j] = t.slice(1, t.length) + t.slice(0, 1);
          }
          if(s.length > 1) {
            s = s.join(characters.correct("¬"));
          } else {
            s = s[i];
          }
          
          a.value[i] = new STRING(s);
        }
        this.tkn.outputs.back(a.stringify());
      }
    } else this.tkn.inputs.front(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(noodel.commandify(characters.correct("ạ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var index = undefined, count = undefined;
      if(f.type === "NUMBER") {
        index = f.valueify();
        f = this.tkn.inputs.front();
        if(!f) {
          noodel.make_error(new STRING("¤Found¤a¤NUMBER¤in¤the¤pipe,¤but¤nothing¤followed."), path);
          return;
        }
      }
      
      // If another number then that is where the animation should stop.
      if(f.type === "NUMBER") {
        count = f.valueify();
        f = this.tkn.inputs.front();
        if(!f) {
          noodel.make_error(new STRING("¤Found¤a¤NUMBER¤in¤the¤pipe,¤but¤nothing¤followed."), path);
          return;
        }
      }
      
      if(f.type === "STRING" || f.type === "ARRAY") {
        if(f.frame === undefined) f.frame = index;
        if(f.frame === undefined) {
          f.frame = 0;
          f.frame_direction = 1;
        }
        // Now can determine which direction that is needed to go.
        else f.frame_direction = f.frame < 0 ? -1 : 1;
        if(f.frame_count === undefined) f.frame_count = count;
        if(f.frame_count === undefined) f.frame_count = f.length();
        
        // If there is a frame_count still then can access.
        if(f.frame_count !== 0) {
          var item = f.access(Math.abs(f.frame % f.length()));
          this.tkn.outputs.back(item);
          f.frame = (f.frame + f.frame_direction) % f.length();
          --f.frame_count;
        }
        
        // Finished animation sequence therein can reset.
        if(f.frame_count === 0) {
          f.frame = undefined;
          f.frame_count = undefined;
        }
        
        this.tkn.outputs.back(f);
      } else {
        noodel.make_error(new STRING("¤Expected¤an¤ARRAY¤or¤STRING."), path);
        return;
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
/// The number following the token will be used as the first number.
Command.add(new RegExp("^(" + characters.correct("ạ") + ")((?:\\-\\d*)|(?:\\d+))$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var index = this.tkn.params[0] === "-" ? 0 : +this.tkn.params[0], count = undefined;
      var direction = this.tkn.params[0] === "-" ? -1 : (index < 0 ? -1 : 1);
      // If another number then that is where the animation should stop.
      if(f.type === "NUMBER") {
        count = f.valueify();
        f = this.tkn.inputs.front();
        if(!f) {
          noodel.make_error(new STRING("¤Found¤a¤NUMBER¤in¤the¤pipe,¤but¤nothing¤followed."), path);
          return;
        }
      }
      
      if(f.type === "STRING" || f.type === "ARRAY") {
        if(f.frame === undefined) f.frame = index;
        f.frame_direction = direction;
        if(f.frame_count === undefined) f.frame_count = count;
        if(f.frame_count === undefined) f.frame_count = f.length();
        
        // If there is a frame_count still then can access.
        if(f.frame_count !== 0) {
          var item = f.access(Math.abs((f.frame + f.length()) % f.length()));
          this.tkn.outputs.back(item);
          f.frame = (f.frame + f.frame_direction) % f.length();
          --f.frame_count;
        }
        
        // Finished animation sequence therein can reset.
        if(f.frame_count === 0) {
          f.frame = undefined;
          f.frame_count = undefined;
        }
        
        this.tkn.outputs.back(f);
      } else {
        noodel.make_error(new STRING("¤Expected¤an¤ARRAY¤or¤STRING."), path);
        return;
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
