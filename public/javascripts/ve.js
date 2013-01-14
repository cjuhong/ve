
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
  VE.scene.add(VE.camera);

  // start the renderer
  VE.renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  document.body.appendChild(VE.renderer.domElement);

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
  VE.scene.add(boundingBox);

  // first render
  VE.renderer.render(VE.scene, VE.camera);
  // to be continued...
  VE.stats = new Stats();
  VE.stats.domElement.style.position = 'absolute';
  VE.stats.domElement.style.top = '10px';
  VE.stats.domElement.style.left = '10px';
  document.body.appendChild( VE.stats.domElement );

  document.getElementById("enter_button").addEventListener('click', function (event) {
    event.preventDefault();
    VE.start();

  });
};


VE.start = function() {
  document.getElementById("menu").style.display = "none";
  VE.pointsDOM = document.getElementById("points");
  VE.pointsDOM.style.display = "block";
  VE.animate();
  VE.Hall.generateBooths();
  VE.Utils.funcionTesting();
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
VE.StepTime = 1000;
VE.frameTime = 0; // ms
VE.over = false;
VE.cumulatedFrameTime = 0; // ms
VE._lastFrameTime = Date.now(); // timestamp

VE.animate = function() {
  var time = Date.now();
  VE.frameTime = time - VE._lastFrameTime;
  VE._lastFrameTime = time;
  VE.cumulatedFrameTime += VE.frameTime;

  while(VE.cumulatedFrameTime > VE.StepTime) {
    // block movement will go here
    VE.cumulatedFrameTime -= VE.gameStepTime;
  }

  VE.renderer.render(VE.scene, VE.camera);

  VE.stats.update();

  if(!VE.over) window.requestAnimationFrame(VE.animate);
};

window.addEventListener("load", VE.init);

window.addEventListener('keydown', function (event) {
  var key = event.which ? event.which : event.keyCode;
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
  }
}, false);