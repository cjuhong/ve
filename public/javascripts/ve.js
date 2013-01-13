var VE = {};

VE.init = function() {
  // set the scene size
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  // set some camera attributes
  var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

  // create a WebGL renderer, camera
  // and a scene
  VE.renderer = new THREE.WebGLRenderer();
  VE.camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                                ASPECT,
                                                NEAR,
                                                FAR  );
  VE.scene = new THREE.Scene();

  // the camera starts at 0,0,0 so pull it back
  VE.camera.position.z = 600;
  console.log(VE.camera.position.x);
  console.log(VE.camera.position.y);
  console.log(VE.camera.position.z);
  VE.scene.add(VE.camera);

  // start the renderer
  VE.renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  document.body.appendChild(VE.renderer.domElement);

  // to be continued...
  // configuration object
  var boundingBoxConfig = {
    width: 360,
    height: 360,
    depth: 1200,
    splitX: 6,
    splitY: 6,
    splitZ: 20
  };

  VE.boundingBoxConfig = boundingBoxConfig;
  VE.blockSize = boundingBoxConfig.width/boundingBoxConfig.splitX;

  var boundingBox = new THREE.Mesh(
    new THREE.CubeGeometry(
      boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth,
      boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ),
    new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } )
  );
  console.log(boundingBox.position.x);
  console.log(boundingBox.position.y);
  console.log(boundingBox.position.z);

  VE.scene.add(boundingBox);

  // first render
  VE.renderer.render(VE.scene, VE.camera);
  // to be continued...
  VE.stats = new Stats();
  VE.stats.domElement.style.position = 'absolute';
  VE.stats.domElement.style.top = '10px';
  VE.stats.domElement.style.left = '10px';
  document.body.appendChild( VE.stats.domElement );
  
  // add anywhere in VE.init
  VE.Board.init(boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);

  document.getElementById("play_button").addEventListener('click', function (event) {
    event.preventDefault();
    VE.start();
  });
};
VE.start = function() {
  document.getElementById("menu").style.display = "none";
  VE.pointsDOM = document.getElementById("points");
  VE.pointsDOM.style.display = "block";
  VE.Block.generate(); // add this line
  VE.animate();
};
if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
                                     return window.webkitRequestAnimationFrame ||
                                       window.mozRequestAnimationFrame ||
                                       window.oRequestAnimationFrame ||
                                       window.msRequestAnimationFrame ||
                                       function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                                         window.setTimeout( callback, 1000 / 60 );
                                       };
                                   })();
}

VE.gameStepTime = 1000;
VE.frameTime = 0; // ms
VE.cumulatedFrameTime = 0; // ms
VE._lastFrameTime = Date.now(); // timestamp

VE.gameOver = false;
VE.animate = function() {
  var time = Date.now();
  VE.frameTime = time - VE._lastFrameTime;
  VE._lastFrameTime = time;
  VE.cumulatedFrameTime += VE.frameTime;

  while(VE.cumulatedFrameTime > VE.gameStepTime) {
    // block movement will go here
    VE.cumulatedFrameTime -= VE.gameStepTime;
    VE.Block.move(0,0,-1); // add this line
  }

  VE.renderer.render(VE.scene, VE.camera);

  VE.stats.update();

  if(!VE.gameOver) window.requestAnimationFrame(VE.animate);
}
window.addEventListener("load", VE.init);

VE.staticBlocks = [];
VE.zColors = [
  0x6666ff, 0x66ffff, 0xcc68EE, 0x666633, 0x66ff66, 0x9966ff, 0x00ff66, 0x66EE33, 0x003399, 0x330099, 0xFFA500, 0x99ff00, 0xee1289, 0x71C671, 0x00BFFF, 0x666633, 0x669966, 0x9966ff
];

VE.addStaticBlock = function(x,y,z) {
  if(VE.staticBlocks[x] === undefined) VE.staticBlocks[x] = [];
  if(VE.staticBlocks[x][y] === undefined) VE.staticBlocks[x][y] = [];

  var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( VE.blockSize, VE.blockSize, VE.blockSize), [
    new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true}),
    new THREE.MeshBasicMaterial({color: VE.zColors[z]})
  ] );

  mesh.position.x = (x - VE.boundingBoxConfig.splitX/2)*VE.blockSize + VE.blockSize/2;
  mesh.position.y = (y - VE.boundingBoxConfig.splitY/2)*VE.blockSize + VE.blockSize/2;
  mesh.position.z = (z - VE.boundingBoxConfig.splitZ/2)*VE.blockSize + VE.blockSize/2;
  mesh.overdraw = true;

  VE.scene.add(mesh);
  VE.staticBlocks[x][y][z] = mesh;
};
VE.currentPoints = 0;
VE.addPoints = function(n) {
  VE.currentPoints += n;
  VE.pointsDOM.innerHTML = VE.currentPoints;
  Cufon.replace('#points');
}