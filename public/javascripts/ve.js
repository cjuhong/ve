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
  //var   controls = new THREE.FirstPersonControls( VE.camera );

  // the camera starts at 0,0,0 so pull it back
  //VE.camera.position.z = 600;
  VE.scene.add(VE.camera);


  //var clock = new THREE.Clock();

  //controls.movementSpeed = 70;
  //controls.lookSpeed = 0.05;
  //controls.noFly = true;
  //controls.lookVertical = false;

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
  VE.Booth.testingFuntion();
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
  //var delta = clock.getDelta();

  VE.frameTime = time - VE._lastFrameTime;
  VE._lastFrameTime = time;
  VE.cumulatedFrameTime += VE.frameTime;

  while(VE.cumulatedFrameTime > VE.StepTime) {
    // block movement will go here
    VE.cumulatedFrameTime -= VE.gameStepTime;
  }
  //controls.update(delta);
  VE.renderer.render(VE.scene, VE.camera);

  VE.stats.update();

  if(!VE.over) window.requestAnimationFrame(VE.animate);
};

window.addEventListener("load", VE.init);
