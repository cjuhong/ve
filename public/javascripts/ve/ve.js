define(['ve/veWall', 've/veCeiling', 've/veGround', 'views/message', 'NavigationSly'],

function(Walls, Ceiling, Ground, Message, NavigationSly) {
  'use strict';
  // Physijs.scripts.worker = '/javascripts/libs/physijs/physijs_worker.js';
  // Physijs.scripts.ammo = '/javascripts/libs/physijs/ammo.js';
  var VE = {};
  VE.ground = Ground;
  VE.ceiling = Ceiling;
  VE.walls = Walls;
  VE.globals = {};
  VE.globals.selected_block = null;
  VE.globals.block_offset = new THREE.Vector3; 
  VE.globals.mouse_position = new THREE.Vector3;
  VE.globals._v3 = new THREE.Vector3;
  VE.blocks = [];
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
    // VE.renderer.shadowMapEnabled = true;
    // VE.renderer.shadowMapType = THREE.PCFShadowMap;
    // VE.renderer.shadowMapEnabled = true;
    // VE.renderer.shadowMapSoft = true;
    VE.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);



    // VE.camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, - 500, 1000 );

    // VE.camera.position.set(2740, -300, 1990);
    VE.camera.position.set(600, -300, 600);

    //  VE.camera.position.set(0,0-(VE.HallConfig.height/2 - 200/2),500);

    VE.scene = new Physijs.Scene();
    VE.scene.setGravity(new THREE.Vector3(0, -1000, 0));
    VE.scene.addEventListener(
      'update',

    function() {
      // console.log('message: updating');
      if ( VE.globals.selected_block !== null ) {
        
        VE.globals._v3.copy( VE.globals.mouse_position ).add( VE.globals.block_offset ).sub( VE.globals.selected_block.position ).multiplyScalar( 15 );
        VE.globals._v3.y = 0;
        // selected_block.setLinearVelocity( _v3 );
        VE.globals.selected_block.setLinearVelocity( VE.globals._v3 );
        
        // Reactivate all of the blocks
        // _v3.set( 0, 0, 0 );
        // for ( _i = 0; _i < blocks.length; _i++ ) {
        //  blocks[_i].applyCentralImpulse( _v3 );
        // }
      }
      VE.scene.simulate(undefined, 1);
    });
    VE.camera.lookAt(VE.scene.position);

    VE.intersect_plane = new THREE.Mesh(
      new THREE.PlaneGeometry( 5500, 4000 ),
      new THREE.MeshBasicMaterial({ opacity: 0, transparent: true, color: 0x8ef877 })
    );
    // console.log(VE.intersect_plane instanceof Physijs.BoxMesh);
    VE.intersect_plane.rotation.x = Math.PI / -2;
    // VE.intersect_plane.position.y = -300;
    console.log(VE.intersect_plane.position);
    VE.scene.add( VE.intersect_plane );


    VE.scene.add(VE.ground);
    VE.scene.add(VE.ceiling);
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
    VE.blocks.push(box);
    var box_two = new Physijs.BoxMesh(
    new THREE.CubeGeometry(500, 50, 500),
    new THREE.MeshBasicMaterial({
      color: 0x88ff88
    }));
    box_two.position.y = 100;
    VE.scene.add(box_two);
    VE.blocks.push(box_two);

    VE.initEventHandling();
    // first render
    VE.renderer.render(VE.scene, VE.camera);

    VE.controls = new THREE.FirstPersonControls(VE.camera);
    VE.controls.movementSpeed = 70;
    VE.controls.noFly = true;
    VE.controls.lookVertical = true;

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

  VE.initEventHandling = (function() {
    var _vector = new THREE.Vector3,
      projector = new THREE.Projector(),
      handleMouseDown, handleMouseMove, handleMouseUp;
    
    handleMouseDown = function( evt ) {
      var ray, intersections;
      // console.log(evt);
      // console.log(_vector);
      switch ( event.button ) {
        case 0:
      _vector.set(
        ( evt.clientX / window.innerWidth ) * 2 - 1,
        -( evt.clientY / window.innerHeight ) * 2 + 1,
        1
      );
      // console.log(_vector);
      // console.log(VE.camera.position);
      projector.unprojectVector( _vector, VE.camera );
      // console.log(_vector);
      ray = new THREE.Raycaster( VE.camera.position, _vector.sub( VE.camera.position ).normalize() );
      intersections = ray.intersectObjects(VE.blocks);
      // console.log(intersections);
      if ( intersections.length > 0 ) {
        if(intersections[0].object instanceof Physijs.BoxMesh){
        VE.globals.selected_block = intersections[0].object;
        // VE.camera.lookAt(VE.globals.selected_block.position);

        console.log("Physijs.BoxMesh");
        _vector.set( 0, 0, 0 );
        VE.globals.selected_block.setAngularFactor( _vector );
        VE.globals.selected_block.setAngularVelocity( _vector );
        VE.globals.selected_block.setLinearFactor( _vector );
        VE.globals.selected_block.setLinearVelocity( _vector );
        // console.log(intersections[0].point);
        VE.globals.mouse_position.copy( intersections[0].point );
        // console.log(mouse_position);
        // console.log(selected_block.position);
        VE.globals.block_offset.subVectors( VE.globals.selected_block.position, VE.globals.mouse_position );
        
        VE.intersect_plane.position.y = VE.globals.mouse_position.y-10;
      }
      }
      break;
    }
    };
    
    handleMouseMove = function( evt ) {
      
      var ray, intersection,
        i, scalar;

      if ( VE.globals.selected_block !== null ) {
        
        _vector.set(
          ( evt.clientX / window.innerWidth ) * 2 - 1,
          -( evt.clientY / window.innerHeight ) * 2 + 1,
          -100
        );
        // console.log(_vector);
        projector.unprojectVector( _vector, VE.camera );
        // console.log(VE.camera.position);
        ray = new THREE.Raycaster( VE.camera.position, _vector.sub( VE.camera.position ).normalize() );
        intersection = ray.intersectObject( VE.intersect_plane );
        VE.globals.mouse_position.copy( intersection[0].point );
      }
      
    };
    
    handleMouseUp = function( evt ) {
      
      if ( VE.globals.selected_block !== null ) {
        _vector.set( 1, 1, 1 );
        VE.globals.selected_block.setAngularFactor( _vector );
        VE.globals.selected_block.setLinearFactor( _vector );
        
        VE.globals.selected_block = null;
      }
      
    };
    
    return function() {
      VE.renderer.domElement.addEventListener( 'mousedown', handleMouseDown );
      VE.renderer.domElement.addEventListener( 'mousemove', handleMouseMove );
      VE.renderer.domElement.addEventListener( 'mouseup', handleMouseUp );
    };
  })();

  return VE;
  // VE.init();
});