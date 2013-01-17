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
  VE.boothSize = {};

  VE.boundingBoxConfig = {
    width: 3600,
    height: 360,
    depth: 2400,
    splitX: 60,
    splitY: 6,
    splitZ: 40
  };

  var boundingBoxConfig = VE.boundingBoxConfig;

  VE.clock = new THREE.Clock();
  VE.controls = undefined;
  // create a WebGL renderer, camera
  // and a scene
  VE.renderer = new THREE.WebGLRenderer();
  VE.camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                            ASPECT,
                                            NEAR,
                                            FAR  );
  VE.scene = new THREE.Scene();


  // the camera starts at 0,0,0 so pull it back
  //  VE.camera.position.z = -boundingBoxConfig.height/2 ;
  //VE.camera.position.z = -360 ;
  VE.scene.add(VE.camera);



  /*
  VE.controls = new THREE.FirstPersonControls( VE.camera );
  VE.controls.movementSpeed = 70;
  VE.controls.lookSpeed = 0.05;
  VE.controls.noFly = true;
  VE.controls.lookVertical = true;
*/
  // start the renderer
  VE.renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  document.body.appendChild(VE.renderer.domElement);

  // configuration object

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
    document.getElementById("menu").style.display = "none";
    document.getElementById("size").style.display = "block";
    VE.pointsDOM = document.getElementById("points");
    VE.pointsDOM.style.display = "block";
//    VE.start();

  });

  document.getElementById("ok").addEventListener('click', function (event) {
    event.preventDefault();

    VE.controls = new THREE.FirstPersonControls( VE.camera );
    VE.controls.movementSpeed = 70;
    VE.controls.lookSpeed = 0.05;
    VE.controls.noFly = true;
    VE.controls.lookVertical = true;

    document.getElementById("size").style.display = "none";
    var row = document.getElementById("row");
    var column = document.getElementById("column");

    VE.boothSize.row = Number(row.value);
    VE.boothSize.column = Number(column.value);
    VE.start();

  });
};


VE.start = function() {
  VE.Hall.generateBooths(VE.boothSize);
  VE.Hall.addBoothToScene();
  VE.Model.loader();
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

VE.over = false;

/*
 VE.StepTime = 1000;
 VE.frameTime = 0;
 VE.cumulatedFrameTime = 0;
 VE._lastFrameTime = Date.now();
 */

VE.animate = function() {
  //  var time = Date.now();
  //var delta = clock.getDelta();

  //VE.frameTime = time - VE._lastFrameTime;
  //VE._lastFrameTime = time;
  //VE.cumulatedFrameTime += VE.frameTime;

  //while(VE.cumulatedFrameTime > VE.StepTime) {
  // block movement will go here
  // VE.cumulatedFrameTime -= VE.gameStepTime;
  // }
  //controls.update(delta);
  VE.controls.update(VE.clock.getDelta());
  VE.renderer.render(VE.scene, VE.camera);

  VE.stats.update();

  if(!VE.over) window.requestAnimationFrame(VE.animate);
};

window.addEventListener("load", VE.init);
