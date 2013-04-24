define(function(require) {
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
    VE.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    VE.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
    //  VE.camera.position.set(0,0-(VE.boundingBoxConfig.height/2 - 200/2),500);

    VE.scene = new THREE.Scene();

    //  VE.scene.fog = new THREE.Fog( 0xffffff, 1500, 2100 );
    VE.scene.add(VE.camera);

    var axis_helper = new THREE.AxisHelper(5000);
    VE.scene.add(axis_helper);

    //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    var light = new THREE.AmbientLight(0xffeedd); // strong white light
    VE.scene.add(light);
    // start the renderer
    VE.renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    document.body.appendChild(VE.renderer.domElement);

    // configuration object

    VE.boundingBoxConfig = boundingBoxConfig;
    VE.blockSize = boundingBoxConfig.width / boundingBoxConfig.splitX;

    var boundingBox = new THREE.Mesh(
    new THREE.CubeGeometry(
    boundingBoxConfig.width, boundingBoxConfig.height + 1, boundingBoxConfig.depth,
    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ),
    new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true
    }));
    VE.scene.add(boundingBox);

    // first render
    VE.renderer.render(VE.scene, VE.camera);

    VE.controls = new THREE.FirstPersonControls(VE.camera);
    VE.controls.movementSpeed = 70;
    VE.controls.lookSpeed = 0.05;
    VE.controls.noFly = true;
    VE.controls.lookVertical = true;

    VE.start();

  };

  VE.start = function() {

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
    }

    VE.over = false;

    //VE.Hall.generateBooths(VE.boothSize);
    //VE.Hall.addBoothToScene();
    //  VE.Model.loader();
    //VE.Hall.floor();
    //VE.Hall.sprite();
    VE.animate();
  };

  VE.animate = function() {
    //controls.update(delta);
    if (VE.controls.lookVertical == false) {
      if (VE.camera.position.z >= 1100) {
        VE.camera.position.set(VE.camera.position.x, 0 - (VE.boundingBoxConfig.height / 2 - 200 / 2), 1090);
      }
      if (VE.camera.position.x >= 1700) {
        VE.camera.position.set(1690, 0 - (VE.boundingBoxConfig.height / 2 - 200 / 2), VE.camera.position.z);
      }
      if (VE.camera.position.z <= -1100) {
        VE.camera.position.set(VE.camera.position.x, 0 - (VE.boundingBoxConfig.height / 2 - 200 / 2), -1090);
      }
      if (VE.camera.position.x <= -1700) {
        VE.camera.position.set(-1690, 0 - (VE.boundingBoxConfig.height / 2 - 200 / 2), VE.camera.position.z);
      }
    }
    VE.controls.update(VE.clock.getDelta());
    VE.renderer.render(VE.scene, VE.camera);

    if (!VE.over) window.requestAnimationFrame(VE.animate);
  };

  return VE;
});