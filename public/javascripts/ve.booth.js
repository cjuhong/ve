window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Booth = {};

VE.Booth.testingFuntion = function() {
  console.log("testing booth");
};

VE.Booth.create = function(box) {
  var boothBox = new THREE.Mesh(
    new THREE.CubeGeometry( box.width, box.height, box.depth),
    new THREE.MeshBasicMaterial( { color: 0xffaaff} ));

  boothBox.position.x = box.x;
  boothBox.position.y = box.y;
  boothBox.position.z = box.z;

  return boothBox;
}