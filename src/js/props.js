(function(global){

function Props() {
  function the_props(name, value) {
    if(arguments.length === 1) return the_props.__props__[name]
    the_props.__props__[name] = value;
    return the_props;
  }
  the_props.__props__ = {};
  the_props.clear = function() { the_props.__props__ = {}; return the_props };
  the_props.get = function(name) { return the_props.__props__[name] };
  the_props.set = function(name, value) { the_props[name] = value; return the_props; };
  return the_props;
}

global.make_props = Props;

})(this)
