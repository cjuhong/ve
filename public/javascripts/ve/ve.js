define(['ve/gadget','ve/veMouseControl','ve/veWall', 've/veCeiling', 've/veGround', 'views/message', 'NavigationSly'],

  function(Gadget,MouseControl,Walls, Ceiling, Ground, Message, NavigationSly) {
    'use strict';
    window.VE = window.VE  || {};
    window.user = window.user  || {};
    window.utils = window.utils  || {};

    utils.projector = new THREE.Projector();
    utils.intersect_plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5500, 4000),
      new THREE.MeshBasicMaterial({
        opacity: 0,
        transparent: true,
      }));

    user.products = [];
    user.booths = [];
    user.belongs = {};


    VE.mouseVector = new THREE.Vector3();
    VE.ground = Ground;
    VE.ceiling = Ceiling;
    VE.walls = Walls;


    VE.globals = {};
    VE.globals.selected_block = null;
    VE.globals.block_offset = new THREE.Vector3;
    VE.globals.mouse_position = new THREE.Vector3;
    VE.globals._v3 = new THREE.Vector3;
    VE.blocks = [];
    VE.up = false;
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

      VE.camera.position.set(-2740, 0, 1990);

      VE.scene = new Physijs.Scene();
      VE.scene.setGravity(new THREE.Vector3(0, -1000, 0));
      VE.scene.addEventListener(
        'update',

        function() {
          // console.log('message: updating');
          if (VE.globals.selected_block !== null) {
            var _i;
            VE.globals._v3.copy(VE.globals.mouse_position).add(VE.globals.block_offset).sub(VE.globals.selected_block.position).multiplyScalar(30);
            if (VE.up) {
              VE.globals._v3.y = 0;
            }
            if (VE.demo !== null) {
              var _i;
              VE.globals._v3.copy(VE.globals.mouse_position).add(VE.globals.block_offset).sub(VE.globals.selected_block.position).multiplyScalar(30);
              // VE.globals._v3.y = 0;
              VE.demo.setLinearVelocity(VE.globals._v3);
            }
            // selected_block.setLinearVelocity( _v3 );
            VE.globals.selected_block.setLinearVelocity(VE.globals._v3);
            // Reactivate all of the blocks
            // VE.globals._v3.set(0, 0, 0);
            // for (_i = 0; _i < VE.blocks.length; _i++) {
            //   VE.blocks[_i].applyCentralImpulse(VE.globals._v3);
            // }
          }
          VE.scene.simulate(undefined, 1);
        });
      VE.camera.lookAt(VE.scene.position);


      // console.log(VE.intersect_plane instanceof Physijs.BoxMesh);
      utils.intersect_plane.rotation.x = Math.PI / -2;
      VE.scene.add(utils.intersect_plane);

      // console.log(utils.intersect_plane.position);


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


      /********************************************************************************************/
      $.get('/data/models', function(datas) {
        datas.forEach(function(value) {

          var texture = new THREE.Texture();
          var loaderImg = new THREE.ImageLoader();
          loaderImg.addEventListener('load', function(event) {
            texture.image = event.content;
            texture.needsUpdate = true;
          });
          loaderImg.load('/data/' + value.textureId);

          // model
          var loaderObj = new THREE.OBJLoader();

          loaderObj.load('/data/' + value.modelId, function(object) {

            object.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                child.material.map = texture;
              }
            });
            // object.position.set(0,0-VE.boundingBoxConfig.height/2,300);
            object.scale.set(2.0, 2.0, 2.0);
            VE.scene.add(object);
          });
        });
      });







      /*******************test area**********************************************************/

      // var combined = new THREE.Geometry();

      // var geometry = new THREE.CubeGeometry(70, 70, 70);

      // var geometry2 = new THREE.CubeGeometry(170, 170, 170);

      // var mesh1 = new Physijs.BoxMesh( geometry,new THREE.MeshBasicMaterial( { color: 0xff00ff } ) );
      // mesh1.position.x = -200;

      // var mesh2 = new Physijs.BoxMesh( geometry2 ,new THREE.MeshBasicMaterial( { color: 0xbb00aa } ));
      // mesh2.position.x = 700;

      // THREE.GeometryUtils.merge( combined, mesh1 );
      // THREE.GeometryUtils.merge( combined, mesh2 );

      // // var mesh = new THREE.Mesh( combined );
      // var mesh = new Physijs.BoxMesh( combined, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
      // console.log(mesh.position);
      // mesh.position.set(-900,9,99);
      // console.log(mesh.position);
      // VE.scene.add( mesh );


      // var material = new THREE.MeshNormalMaterial();
      var material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
      // var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
      // var sphere = new THREE.Mesh( sphereGeometry, material );
      // sphere.position.set(-60, 55, 0);
      // VE.scene.add( sphere );    

      // var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide } );
      // var outlineMesh1 = new THREE.Mesh( sphereGeometry, outlineMaterial1 );
      // outlineMesh1.position = sphere.position;
      // outlineMesh1.scale.multiplyScalar(1.05);
      // VE.scene.add( outlineMesh1 );

      var cubeGeometry = new THREE.CubeGeometry(80, 80, 80);
      var cube2 = new THREE.Mesh(cubeGeometry, material);
      cube2.position.set(100, 0, 0);

      var cubeGeometry = new THREE.CubeGeometry(80, 80, 80);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(-2160, -160, 1400);
      // console.log(cube.material);
      cube.add(cube2);
      VE.scene.add(cube);
      user.products.push(cube);

      // var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
      // var outlineMesh2 = new THREE.Mesh( cubeGeometry, outlineMaterial2 );
      // outlineMesh2.position = cube.position;
      // // outlineMesh2.scale.multiplyScalar(1.05);
      // VE.scene.add( outlineMesh2 );

      /*****************************************************************/


      $.get('/fethcAllBooths', function(data) {

        data.forEach(function(value) {
          console.log(value);
          VE.booths(value.x,value.z,value._id);
        });

      });

      socket.on("newBooth", function(data) {

        // console.log(socket.socket.sessionid);
        // console.log(data);
        VE.booths(data.x,data.z,data._id);

      });


      VE.initEventHandling = MouseControl(VE);
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

      VE.animate();
      VE.scene.simulate();
    };

    VE.animate = function() {

      if (VE.demo !== null) {
        VE.demo__dirtyPosition = true;
      }
      VE.controls.update(VE.clock.getDelta());
      VE.renderer.render(VE.scene, VE.camera);

      /************************object transparent***************************************************/
      // var utils.INTERSECTED;
      
      utils.raycaster = utils.projector.pickingRay(VE.mouseVector.clone(), VE.camera);
      // var intersects = raycaster.intersectObjects( VE.scene.children );
      // utils.intersects = utils.raycaster.intersectObjects(user.products);
      if(user.role == "organizer"){
        utils.sceneChildren = VE.scene.children.slice(7,-1);
        utils.intersects = utils.raycaster.intersectObjects(utils.sceneChildren);
        // utils.intersects = utils.raycaster.intersectObjects(VE.scene.children);
      }else if(user.role == "exhibitor"){
        utils.intersects = utils.raycaster.intersectObjects(user.products);
      }else{
        utils.intersects = utils.raycaster.intersectObjects(user.products);
      }

      if (utils.intersects.length > 0) {

        if (utils.INTERSECTED != utils.intersects[0].object) {
          if(utils.INTERSECTED){
            utils.INTERSECTED.material.opacity = utils.INTERSECTED.current_opacity;
          }

          utils.INTERSECTED = utils.intersects[0].object;//visible transparent opacity
          utils.INTERSECTED.current_opacity = utils.INTERSECTED.material.opacity ;
          // utils.INTERSECTED.current_transparent = utils.INTERSECTED.material.transparent ;
          // utils.INTERSECTED.material.transparent = true;
          utils.INTERSECTED.material.opacity = 0.7;

        }

      } else {

        if (utils.INTERSECTED != null) {
          utils.INTERSECTED.material.opacity = utils.INTERSECTED.current_opacity;
          // utils.INTERSECTED.material.transparent = utils.INTERSECTED.current_transparent;
        }

        utils.INTERSECTED = null;

      }
      /****************************************************************************/

      if (!VE.over) window.requestAnimationFrame(VE.animate);
    };







    return VE;
  });