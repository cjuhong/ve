define(['ve/veWall', 've/veCeiling', 've/veGround', 'views/message', 'NavigationSly'],

function(Walls, Ceiling, Ground, Message, NavigationSly) {
  'use strict';
  // Physijs.scripts.worker = '/javascripts/libs/physijs/physijs_worker.js';
  // Physijs.scripts.ammo = '/javascripts/libs/physijs/ammo.js';
  var VE = {};
  VE.ground = Ground;
  VE.ceiling = Ceiling;
  VE.walls = Walls;
  // VE.Message = new Message({navigationSly:NavigationSly});
  // VE.NavigationSly = NavigationSly;
  VE.init = function() {
    // set the scene size
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 35,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;
    VE.boothSize = {};

    VE.HallConfig = {
      width: 5500,
      height: 720,
      depth: 4000,
      splitX: 60,
      splitY: 6,
      splitZ: 40
    };

    var HallConfig = VE.HallConfig;

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
    VE.camera.position.set(-2740, -300, -1990);

    //  VE.camera.position.set(0,0-(VE.HallConfig.height/2 - 200/2),500);

    VE.scene = new Physijs.Scene();
    VE.scene.setGravity(new THREE.Vector3(0, -1000, 0));
    VE.scene.addEventListener(
      'update',

    function() {
      // console.log('message: updating');
      VE.scene.simulate(undefined, 1);
    });
    VE.camera.lookAt(VE.scene.position);



    VE.scene.add(VE.ground);
    VE.scene.add(VE.ceiling);
    VE.scene.add(VE.walls);
    for (var i = 0; i < VE.walls.length; i++) {
      VE.scene.add(VE.walls[i]);
    }
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

    VE.HallConfig = HallConfig;
    VE.blockSize = HallConfig.width / HallConfig.splitX;

    var boundingBox = new THREE.Mesh(
    new THREE.CubeGeometry(
    HallConfig.width, HallConfig.height + 1, HallConfig.depth,
    HallConfig.splitX, HallConfig.splitY, HallConfig.splitZ),
    new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: false
    }));
    VE.scene.add(boundingBox);


    // Box
    var box = new Physijs.BoxMesh(
    new THREE.CubeGeometry(500, 50, 500),
    new THREE.MeshBasicMaterial({
      color: 0x888888
    }));
    VE.scene.add(box);

    // first render
    VE.renderer.render(VE.scene, VE.camera);

    VE.controls = new THREE.FirstPersonControls(VE.camera);
    VE.controls.movementSpeed = 70;
    VE.controls.noFly = true;
    VE.controls.lookVertical = false;

    // console.log(VE.controls);
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
    VE.scene.simulate();
  };

  VE.animate = function() {
    //controls.update(delta);
    // if (VE.controls.lookVertical == false) {
    //   if (VE.camera.position.z >= 1100) {
    //     VE.camera.position.set(VE.camera.position.x, 0 - (VE.HallConfig.height / 2 - 200 / 2), 1090);
    //   }
    //   if (VE.camera.position.x >= 1700) {
    //     VE.camera.position.set(1690, 0 - (VE.HallConfig.height / 2 - 200 / 2), VE.camera.position.z);
    //   }
    //   if (VE.camera.position.z <= -1100) {
    //     VE.camera.position.set(VE.camera.position.x, 0 - (VE.HallConfig.height / 2 - 200 / 2), -1090);
    //   }
    //   if (VE.camera.position.x <= -1700) {
    //     VE.camera.position.set(-1690, 0 - (VE.HallConfig.height / 2 - 200 / 2), VE.camera.position.z);
    //   }
    // }
    VE.controls.update(VE.clock.getDelta());
    VE.renderer.render(VE.scene, VE.camera);

    if (!VE.over) window.requestAnimationFrame(VE.animate);
  };

  return VE;
  // VE.init();
});