window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Utils = {};

VE.Utils.cloneVector = function (v) {
  return {x: v.x, y: v.y, z: v.z};
};

VE.Utils.roundVector = function(v) {
  v.x = Math.round(v.x);
  v.y = Math.round(v.y);
  v.z = Math.round(v.z);
};
VE.Utils.funcionTesting = function() {
  console.log("function testing");
}
VE.Utils.isEven = function(number) {
  if( number%2 == 0 )
    return true;
  else
    return false;
}