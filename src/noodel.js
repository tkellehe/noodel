(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

function insertAt(array, pos, item) {
  array.splice(pos, 0, item);
};
function removeAt(array, pos) {
  return array.splice(pos, 1)[0];
};

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

Path.prototype.first = function() {
  return this.stack.value[this.stack.ptr-1]
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

function parseJsObject(JS) {
  if(typeof JS === "string") {
    return new STRING(JS);
  } else if(typeof JS === "number") {
    return new NUMBER(JS);
  } else if(JS instanceof Array) {
    var a = [];
    for(var i = 0; i < JS.length; ++i) {
      var item = parseJsObject(JS[i]);
      if(item) a.push(item);
    }
    return new ARRAY(a);
  }
};
  
global.noodel = function noodel(code) {
  if(typeof code === "string" && code.length) {
    var path = new Path(code);
    path.stack = new ARRAY();
    path.stack.ptr = 0;
    path.onstart = function() { while(this.stdin.first()) this.top(this.stdin.front()) };
    path.onend = function() { if(this.first()) this.stdout.back(this.top()) };
    
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
  
noodel.random = function(min, max) {
  return ((max - min) * Math.random()) + min
};
  
noodel.random_int = function(min, max) {
  return Math.floor(noodel.random(min, max))
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(0, noodel.commandify("[ \n]"), function(cmd) {});

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
