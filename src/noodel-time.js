(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Time.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps based off of what is in the pipe.
Command.add(0, noodel.commandify(characters.correct("ḍ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = f.integerify().value;
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "[shqetoOHT]"), function(cmd) {
  var map = { s: 1000, h: 500, q: 250, e: 125, t: 100, o: 10, O: 10000, H: 50000, T: 750 };
  function get_rate(c) {
    return map[c];
  };
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = get_rate(this.tkn.params[0]);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using fractions
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var num = 1000, den = 1;
    if(this.tkn.params[0].length) {
      num *= +this.tkn.params[0];
    }
    if(this.tkn.params[1].length) {
      den = +this.tkn.params[1];
    }
    this.tkn.params[0] = Math.floor(num / den);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using decimals
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = Math.floor((+("0"+this.tkn.params[0]+"."+this.tkn.params[1]+"0")) * 1000);
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Delay for number of steps based off of what is in the pipe.
Command.add(0, noodel.commandify(characters.correct("Ḍ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = Math.floor(f.numberify().value * 1000);
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("Ḍ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = Math.floor(f.numberify().value + this.tkn.params[0]);
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("Ḍ"), "[shqetoOH]"), function(cmd) {
  var map = { s: 1000, h: 0.5, q: 0.25, e: 0.125, t: 0.1, o: 0.01, O: 100, H: 2, T: 10 };
  function get_rate(c) {
    return map[c];
  };
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = Math.floor(f.numberify().value * this.tkn.params[0]);
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = get_rate(this.tkn.params[0]);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using fractions
Command.add(0, new RegExp("^("+characters.correct("Ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = Math.floor(f.numberify().value * this.tkn.params[0]);
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var num = 1, den = 1;
    if(this.tkn.params[0].length) {
      num *= +this.tkn.params[0];
    }
    if(this.tkn.params[1].length) {
      den = +this.tkn.params[1];
    }
    this.tkn.params[0] = Math.floor(num / den);
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using decimals
Command.add(0, new RegExp("^("+characters.correct("Ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    var f = path.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = Math.floor(f.numberify().value * this.tkn.params[0]);
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        path.top();
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = (+("0"+this.tkn.params[0]+"."+this.tkn.params[1]+"0"));
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of milliseconds since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ")), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime()));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of seconds since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "s"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 1000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of minutes since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "m"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 60000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of hours since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "h"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 3600000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Handle basic stopwatch timer.
Command.add(0, noodel.commandify(characters.correct("Ṭ")), function(cmd) {
  cmd.exec = function(path) {
    var t = path.timer(true);
    if(t !== undefined) path.top(new NUMBER(t));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Handle basic stopwatch timer.
Command.add(0, noodel.commandify(characters.correct("Ṭ") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var t = path.timer(true);
    if(t !== undefined) path.top(new NUMBER(t / 1000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Handle basic stopwatch timer.
Command.add(0, noodel.commandify(characters.correct("Ṭ") + "m"), function(cmd) {
  cmd.exec = function(path) {
    var t = path.timer(true);
    if(t !== undefined) path.top(new NUMBER(t / 60000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Handle basic stopwatch timer.
Command.add(0, noodel.commandify(characters.correct("Ṭ") + "h"), function(cmd) {
  cmd.exec = function(path) {
    var t = path.timer(true);
    if(t !== undefined) path.top(new NUMBER(t / 3600000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ")), function(cmd) {
  cmd.exec = function(path) {
    var end = (new Date).getTime();
    path.top(new NUMBER((end - path.start_time)));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var end = (new Date).getTime();
    path.top(new NUMBER((end - path.start_time) / 1000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "m"), function(cmd) {
  cmd.exec = function(path) {
    var end = (new Date).getTime();
    path.top(new NUMBER((end - path.start_time) / 60000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "h"), function(cmd) {
  cmd.exec = function(path) {
    var end = (new Date).getTime();
    path.top(new NUMBER((end - path.start_time) / 3600000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "b"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(path.start_time));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "bs"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(path.start_time / 1000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "bm"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(path.start_time / 60000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets amount of time since start of path execution.
Command.add(0, noodel.commandify(characters.correct("Ƭ") + "bh"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(path.start_time / 3600000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Creates time representation based off of what is on the stack.
Command.add(0, noodel.commandify(characters.correct("ƈ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f && f.type === "NUMBER") {
      var d = new Date(f.value);
      path.top();
      path.top(new STRING(d.toString()));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Creates time representation based off of what is on the stack.
Command.add(0, noodel.commandify(characters.correct("ƈ"), "[sSmhHdMy]"), function(cmd) {
  var map = {
    s: function(date) { return date.getMilliseconds() },
    S: function(date) { return date.getSeconds() },
    m: function(date) { return date.getMinutes() },
    h: function(date) { return date.getHours() },
    H: function(date) { return (date.getHours() < 12) ? 0 : 1 },
    d: function(date) { return date.getDay() },
    M: function(date) { return date.getMonth() },
    y: function(date) { return date.getFullYear() }
  }
  cmd.exec = function(path) {
    var f = path.first();
    if(f && f.type === "NUMBER") {
      var d = new Date(f.value);
      path.top();
      path.top(new NUMBER(this.tkn.params[0](d)));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = map[this.tkn.params[0]];
    return old.call(this);
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
