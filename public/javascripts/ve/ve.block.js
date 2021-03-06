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

VE.Block = {};

VE.Block.shapes = [
  [
    {x: 0, y: 0, z: 0},
    {x: 1, y: 0, z: 0},
    {x: 1, y: 1, z: 0},
    {x: 1, y: 2, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 0, y: 2, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 1, y: 0, z: 0},
    {x: 1, y: 1, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 0, y: 2, z: 0},
    {x: 1, y: 1, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 1, y: 1, z: 0},
    {x: 1, y: 2, z: 0}
  ]
];

VE.Block.position = {};

VE.Block.generate = function() {
  var geometry, tmpGeometry;

  var type = 2;
//  var type = Math.floor(Math.random()*(VE.Block.shapes.length));
  this.blockType = type;

  VE.Block.shape = [];
  for(var i = 0; i < VE.Block.shapes[type].length; i++) {
    VE.Block.shape[i] = VE.Utils.cloneVector(VE.Block.shapes[type][i]);
  }
  // to be continued...
  geometry = new THREE.CubeGeometry(VE.blockSize, VE.blockSize, VE.blockSize);
  for(var i = 1 ; i < VE.Block.shape.length; i++) {
    tmpGeometry = new THREE.Mesh(new THREE.CubeGeometry(VE.blockSize, VE.blockSize, VE.blockSize));
    tmpGeometry.position.x = VE.blockSize * VE.Block.shape[i].x;
    tmpGeometry.position.y = VE.blockSize * VE.Block.shape[i].y;
    THREE.GeometryUtils.merge(geometry, tmpGeometry);
  }
  // to be continued...
  VE.Block.mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [
    new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true}),
    new THREE.MeshBasicMaterial({color: 0xff0000})
  ]);
  // to be continued...
  // initial position
  VE.Block.position = {x: Math.floor(VE.boundingBoxConfig.splitX/2)-1, y: Math.floor(VE.boundingBoxConfig.splitY/2)-1, z: 15};

  VE.Block.mesh.position.x = (VE.Block.position.x - VE.boundingBoxConfig.splitX/2)*VE.blockSize/2;
  VE.Block.mesh.position.y = (VE.Block.position.y - VE.boundingBoxConfig.splitY/2)*VE.blockSize/2;
  VE.Block.mesh.position.z = (VE.Block.position.z - VE.boundingBoxConfig.splitZ/2)*VE.blockSize + VE.blockSize/2;
  VE.Block.mesh.rotation = {x: 0, y: 0, z: 0};
  VE.Block.mesh.overdraw = true;

  if(VE.Board.testCollision(true) === VE.Board.COLLISION.GROUND) {
      VE.gameOver = true;
      VE.pointsDOM.innerHTML = "GAME OVER";
      Cufon.replace('#points');
  }

  VE.scene.add(VE.Block.mesh);
}; // end of VE.Block.generate()

VE.Block.rotate = function(x,y,z) {
  VE.Block.mesh.rotation.x += x * Math.PI / 180;
  VE.Block.mesh.rotation.y += y * Math.PI / 180;
  VE.Block.mesh.rotation.z += z * Math.PI / 180;

  // append to VE.Block.rotate()
  var rotationMatrix = new THREE.Matrix4();
  rotationMatrix.setRotationFromEuler(VE.Block.mesh.rotation);
  for (var i = 0; i < VE.Block.shape.length; i++) {
      VE.Block.shape[i] = rotationMatrix.multiplyVector3(
          VE.Utils.cloneVector(VE.Block.shapes[this.blockType][i])
      );
    VE.Utils.roundVector(VE.Block.shape[i]);
  }
// to be continued

  // append to VE.Block.rotate()
  if (VE.Board.testCollision(false) === VE.Board.COLLISION.WALL) {
      VE.Block.rotate(-x, -y, -z); // laziness FTW
  }
};
VE.Block.move = function(x,y,z) {
  VE.Block.mesh.position.x += x*VE.blockSize;
  VE.Block.position.x += x;

  VE.Block.mesh.position.y += y*VE.blockSize;
  VE.Block.position.y += y;

  VE.Block.mesh.position.z += z*VE.blockSize;
  VE.Block.position.z += z;
//  if(VE.Block.position.z == 0) VE.Block.hitBottom();

  var collision = VE.Board.testCollision((z != 0));
  if (collision === VE.Board.COLLISION.WALL) {
    VE.Block.move(-x, -y, 0); // laziness FTW
  }
  if (collision === VE.Board.COLLISION.GROUND) {
    VE.Block.hitBottom();
    VE.Board.checkCompleted();
  }
};
VE.Block.hitBottom = function() {
  VE.Block.petrify();
  VE.scene.__removeObject(VE.Block.mesh);
  VE.Block.generate();
};
VE.Block.petrify = function() {
  var shape = VE.Block.shape;
  for(var i = 0 ; i < shape.length; i++) {
    VE.addStaticBlock(VE.Block.position.x + shape[i].x, VE.Block.position.y + shape[i].y, VE.Block.position.z + shape[i].z);
    VE.Board.fields[VE.Block.position.x + shape[i].x][VE.Block.position.y + shape[i].y][VE.Block.position.z + shape[i].z] = VE.Board.FIELD.PETRIFIED;
  }
};

window.addEventListener('keydown', function (event) {
  var key = event.which ? event.which : event.keyCode;
  var cameraPositon = VE.Utils.cloneVector(VE.camera.position);

  switch(key) {
    case 38: // up (arrow)
        //VE.Block.move(0, 1, 0);
      VE.camera.position.z -= 10;
      break;
    case 40: // down (arrow)
      //VE.Block.move(0, -1, 0);
     VE.camera.position.z += 10;
      break;
    case 37: // left(arrow)
      VE.Block.move(-1, 0, 0);
      console.log(VE.Block.position.x);
      break;
    case 39: // right (arrow)
      VE.Block.move(1, 0, 0);
      console.log(VE.Block.position.x);
      break;
    case 32: // space
      VE.Block.move(0, 0, -1);
      break;

    case 87: // up (w)
      VE.Block.rotate(90, 0, 0);
      break;
    case 83: // down (s)
      VE.Block.rotate(-90, 0, 0);
      break;

    case 65: // left(a)
      VE.Block.rotate(0, 0, 90);
      break;
    case 68: // right (d)
      VE.Block.rotate(0, 0, -90);
      break;

    case 81: // (q)
      VE.Block.rotate(0, 90, 0);
      break;
    case 69: // (e)
      VE.Block.rotate(0, -90, 0);
      break;
  }
}, false);