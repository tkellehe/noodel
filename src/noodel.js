(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

function insertAt(array, pos, item) {
  array.splice(pos, 0, item);
};
function removeAt(array, pos) {
  return array.splice(pos, 1)[0];
};
  
function handleUnicode(s) {
  s = s.replace(/\%([0-9A-F]+)/g, function(c,n) { return String.fromCharCode(parseInt(n, 16)); });
  return s;
};
  
characters.deprintify_char = function(c) {
  if(c === "\n") return characters.correct("¶");
  if(c === " ") return characters.correct("¤");
  // Handles unicode characters.
  if(!characters.printables.is(c)) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  }
  return c;
};
  
characters.deprintify_string = function(s) {
  var r = "";
  for(var i = 0; i < s.length; ++i) r += characters.deprintify_char(s[i]);
  return r;
};
  
Path.prototype.printify = function() {
  var r = (new ARRAY(this.stdout.__array__)).printify();
  
  var rows = string_row_break(r); 
  
  r = (rows[0] === undefined ? "" : rows[0]);
  for(var i = 1; i < rows.length; ++i) r += "\n" + (rows[i] === undefined ? "" : rows[i]);
  
  var final = "";
  for(var i = 0; i < r.length; ++i) {
    if(r[i] === characters.correct("¶")) final += "\n";
    else if(r[i] === characters.correct("¤")) final += " ";
    else final += r[i];
  }
  
  final = handleUnicode(final);
  
  return noodel.encode(final);
}

Path.prototype.first = function() {
  return this.stack.value[this.stack.ptr-1]
};

Path.prototype.first_ith = function(index) {
  if((this.stack.ptr-1-index) < 0) index = 0;
  else if(this.stack.length() <=( this.stack.ptr-1-index)) index = this.stack.length();
  else index = this.stack.ptr-1-index;
  return this.stack.value[index];
};

Path.prototype.last = function() {
  return this.stack.value[0]
};

Path.prototype.top = function(item) {
  var pos = this.stack.ptr;
  if(arguments.length === 1) {
    if(item === undefined) return;
    if(item.type === "ARRAY") {
      if(item.ptr === undefined) item.ptr = 0;
      item.container = this.stack;
    }
    
    insertAt(this.stack.value, pos, item);
    this.stack.ptr = pos+1;
  } else {
    item = removeAt(this.stack.value, pos-1);
    if(item) {
      if(item.type === "ARRAY") {
        item.container = undefined;
      }
      this.stack.ptr = pos-1;
    }
    return item;
  }
};

Path.prototype.top_ith = function(index, item) {
  var pos = this.stack.ptr;
  if(arguments.length === 2) {
    if(item === undefined) return;
    if(item.type === "ARRAY") {
      if(item.ptr === undefined) item.ptr = 0;
      item.container = this.stack;
    }
    
    insertAt(this.stack.value, pos-index, item);
    this.stack.ptr = pos+1;
  } else {
    item = removeAt(this.stack.value, pos-1-index);
    if(item) {
      if(item.type === "ARRAY") {
        item.container = undefined;
      }
      this.stack.ptr = pos-1;
    }
    return item;
  }
};

Path.prototype.bottom = function(item) {
  var pos = this.stack.ptr;
  if(arguments.length === 1) {
    if(item === undefined) return;
    if(item.type === "ARRAY") {
      if(item.ptr === undefined) item.ptr = 0;
      item.container = this.stack;
    }
    
    insertAt(this.stack.value, 0, item);
    this.stack.ptr = pos+1;
  } else {
    item = removeAt(this.stack.value, 0);
    if(item) {
      if(item.type === "ARRAY") {
        item.container = undefined;
      }
      this.stack.ptr = pos-1;
    }
    return item;
  }
};
  
Path.prototype.move_up = function() {
  var pos = this.stack.ptr;
  if(0 <= pos && pos < this.stack.length()) {
    this.stack.ptr = pos+1;
  }
};
  
Path.prototype.move_down = function() {
  var pos = this.stack.ptr;
  if(0 < pos && pos <= this.stack.length()) {
    this.stack.ptr = pos-1;
  }
};
  
Path.prototype.move_to_top = function() {
  this.stack.ptr = this.stack.length();
};
  
Path.prototype.move_to_bottom = function() {
  this.stack.ptr = 0;
};
  
Path.prototype.jump_in = function() {
  var item = this.top();
  if(item === undefined) {
    item = new ARRAY();
  } else {
    item = item.arrayify();
  }
  this.top(item);
  
  this.stack = item;
};
  
Path.prototype.jump_out = function() {
  var container = this.stack.container;
  if(container === undefined) {
    container = new ARRAY([this.stack]);
    this.stack.container = container;
    container.ptr = 1;
  }
  
  this.stack = container;
};
  
Path.prototype.reverse_stack = function() {
  for(var i = 0,  l = Math.floor(this.stack.ptr/2); i < l; ++i) {
    var temp = this.stack.value[i];
    this.stack.value[i] = this.stack.value[this.stack.ptr - i - 1];
    this.stack.value[this.stack.ptr - i - 1] = temp;
  }
}

Path.prototype.time_passed = function() {
  var end = (new Date).getTime();
  return end - this.start_time;
}

Path.prototype.timer = function(clear) {
  var end = (new Date).getTime();
  if(this.timer.start === undefined) {
    this.timer.start = end;
    return undefined;
  }
  end -= this.timer.start;
  if(clear) this.timer.start = undefined;
  return end;
}

// Run time call only.
Path.prototype.current_line = function(tkn) {
  var parent = tkn, count = 0;
  while(parent.parent) {
    if(parent.literal === "\n") ++count;
    parent = parent.parent;
  }
  
  return this.lines.length - count - 1;
}

function parseJsObject(JS) {
  if(typeof JS === "string") {
    return new STRING(characters.deprintify_string(JS));
  } else if(typeof JS === "number") {
    return new NUMBER(JS);
  } else if(JS instanceof Array) {
    var a = [];
    for(var i = 0; i < JS.length; ++i) {
      var item = parseJsObject(JS[i]);
      if(item) a.push(item);
    }
    return new ARRAY(a);
  } else if(typeof JS === "boolean") {
    return new NUMBER(JS ? 1 : 0);
  }
};
  
global.noodel = function noodel(code) {
  if(typeof code === "string" && code.length) {
    var path = new Path(noodel.decode(code));
    path.stack = new ARRAY();
    path.stack.ptr = 0;
    path.auto_popping = true;
    path.onstart = function() { while(this.stdin.first()) this.top(this.stdin.front()) };
    path.onend = function() { if(this.first() && this.auto_popping) this.stdout.back(this.top()) };
    
    path.call_stack = [];
    
    if(path.lines === undefined) path.lines = [path.start];
    else path.lines.unshift(path.start);
    path.lines.reverse();
    path.start = path.lines[0];
    path.current = path.start;
    
    for(var i = 1; i < arguments.length; ++i) {
      var item = parseJsObject(arguments[i]);
      if(item) path.stdin.back(item);
    }
    
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

noodel.highest_precision = function(value) {
  var string = value+"", decimal = string.indexOf(".");
  if(decimal === -1) return 1;
  return Math.pow(10, decimal + 1 - string.length);
};
  
noodel.random = function(min, max) {
  // By adding the small delta allows the max to be included
  // but if the max is large (extremely large) then might have a problem.
  
  // By taking the min of the random and max prevents from getting numbers outside of range
  // BUT does mess up the even distribution.
  return Math.min(max,((max - min + 0.000000001) * Math.random()) + min);
};
  
noodel.random_int = function(min, max) {
  min = Math.ceil(min);
  return Math.floor((Math.floor(max) - min + 1) * Math.random()) + min;
};
  
noodel.encode = function(string) {
  var result = "";
  for(var i = 0; i < string.length; ++i) {
    result += String.fromCharCode(characters.char_to_int(string[i]));
  }
  return result;
};
  
noodel.decode = function(string) {
  var result = "";
  for(var i = 0; i < string.length; ++i) {
    result += characters.int_to_char(string.charCodeAt(i));
  }
  return result;
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(0, noodel.commandify(" "), function(cmd) {});
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", " "), function(cmd) {
  cmd.exec = function(path) {
    if(this.tkn.count === undefined) {
      this.tkn.count = this.tkn.params[0];
      var temp = this.tkn.old_next;
      this.tkn.old_next = this.tkn.next;
      this.tkn.next = temp;
    }
    
    if(this.tkn.count-- < 1) {
      this.tkn.count = undefined;
      var temp = this.tkn.old_next;
      this.tkn.old_next = this.tkn.next;
      this.tkn.next = temp;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    var tkn = this.tkn;
    this.tkn.old_next = function() { return tkn };
    return old.call(this);
  }
});

Command.add(0, noodel.commandify("\n"), function(cmd) {
 cmd.exec = function(path) {
   var ret = path.call_stack.pop();
   if(ret) {
     this.tkn.next = function() { return ret }
   } else {
     this.tkn.next = function() { return undefined }
   }
 }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var parent_path = this.tkn.path;
    while(parent_path.parent) parent_path = parent_path.parent;
    if(parent_path.lines === undefined) parent_path.lines = [];
    var result = old.call(this);
    parent_path.lines.push(this.tkn.next());
    return result;
  }
});
  
})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
