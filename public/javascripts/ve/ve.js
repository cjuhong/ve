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
    utils.sceneChildren = [];
    utils.selectedObject = null;
    var FizzyText =  {
      message : ' object control',
      x : 0,
      y : 0,
      z : 0,
      rotateX:0,
      rotateY:0,
      rotateZ:0,
      scaleUp:1,
      scaleDown:1,
      reset: function(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
        this.scaleUp = 1;
        this.scaleDown = 1;
      }
    };

    utils.fizzyText = FizzyText;
    utils.gui = new dat.GUI();
    utils.gui.previewValueX = null;
    utils.gui.previewValueY = null;
    utils.gui.previewValueZ = null;

    utils.gui.previewValueRX = null;
    utils.gui.previewValueRY = null;
    utils.gui.previewValueRZ = null;

    utils.gui.previewValueSU = null;
    utils.gui.previewValueSD = null;

    utils.gui.resetPreviewValue = function(){
      utils.gui.previewValueX = null;
      utils.gui.previewValueY = null;
      utils.gui.previewValueZ = null;

      utils.gui.previewValueRX = null;
      utils.gui.previewValueRY = null;
      utils.gui.previewValueRZ = null;

      utils.gui.previewValueSU = null;
      utils.gui.previewValueSD = null;
    };

    utils.gui.previewValueFinishedX = null;
    utils.gui.previewValueFinishedY = null;
    utils.gui.previewValueFinishedZ = null;
    utils.gui.add(utils.fizzyText, 'message');
    var xController = utils.gui.add(utils.fizzyText, 'x', -400, 400).listen();
    var yController = utils.gui.add(utils.fizzyText, 'y', -400, 400).listen();
    var zController = utils.gui.add(utils.fizzyText, 'z', -400, 400).listen();

    var rxController = utils.gui.add(utils.fizzyText, 'rotateX', -3.2, 3.2).step(0.1).listen();
    var ryController = utils.gui.add(utils.fizzyText, 'rotateY', -3.2, 3.2).listen();
    var rzController = utils.gui.add(utils.fizzyText, 'rotateZ', -3.2, 3.2).listen();


    var suController = utils.gui.add(utils.fizzyText, 'scaleUp', 1, 30).step(1).listen();
    var sdController = utils.gui.add(utils.fizzyText, 'scaleDown', 1, 30).step(1).listen();

    utils.gui.domElement.style.display = 'none';

    suController.onChange(function(value) {
      if(utils.gui.previewValueSU == null){
        utils.gui.previewValueSU = 0;
        utils.gui.previewValueSD = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      console.log(utils.selectedObject.scale);
      utils.selectedObject.scale.x = utils.selectedObject.scale.x + (value - utils.gui.previewValueSU);
      utils.selectedObject.scale.y = utils.selectedObject.scale.y + (value - utils.gui.previewValueSU);
      utils.selectedObject.scale.z = utils.selectedObject.scale.z + (value - utils.gui.previewValueSU);
      console.log(utils.selectedObject.scale);
      utils.gui.previewValueSU = value;

    });


    sdController.onChange(function(value) {
      if(utils.gui.previewValueSD == null){
        utils.gui.previewValueSD = 0;
        utils.gui.previewValueSU = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      utils.selectedObject.scale.x = utils.selectedObject.scale.x - (value - utils.gui.previewValueSD);
      utils.selectedObject.scale.y = utils.selectedObject.scale.y - (value - utils.gui.previewValueSD);
      utils.selectedObject.scale.z = utils.selectedObject.scale.z - (value - utils.gui.previewValueSD);

      utils.gui.previewValueSD = value;

    });


    rxController.onChange(function(value) {
      if(utils.gui.previewValueRX == null){
        utils.gui.previewValueRX = 0;
        utils.gui.previewValueRY = null;
        utils.gui.previewValueRZ = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      // console.log(utils.selectedObject.position.z);
      utils.selectedObject.rotation.x = utils.selectedObject.rotation.x + (value - utils.gui.previewValueRX);
      utils.gui.previewValueRX = value;

    });

    ryController.onChange(function(value) {
      if(utils.gui.previewValueRY == null){
        utils.gui.previewValueRY = 0;
        utils.gui.previewValueRX = null;
        utils.gui.previewValueRZ = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      // console.log(utils.selectedObject.position.z);
      utils.selectedObject.rotation.y = utils.selectedObject.rotation.y + (value - utils.gui.previewValueRY);
      utils.gui.previewValueRY = value;

    });

    rzController.onChange(function(value) {
      if(utils.gui.previewValueRZ == null){
        utils.gui.previewValueRZ = 0;
        utils.gui.previewValueRY = null;
        utils.gui.previewValueRX = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      // console.log(utils.selectedObject.position.z);
      utils.selectedObject.rotation.z = utils.selectedObject.rotation.z + (value - utils.gui.previewValueRZ);
      utils.gui.previewValueRZ = value;

    });


    xController.onChange(function(value) {
      if(utils.gui.previewValueX == null){
        utils.gui.previewValueX = 0;
        utils.gui.previewValueY = null;
        utils.gui.previewValueZ = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      // console.log(utils.selectedObject.position.z);
      utils.selectedObject.position.x = utils.selectedObject.position.x + (value - utils.gui.previewValueX);
      utils.gui.previewValueX = value;

      // Fires on every change, drag, keypress, etc.
      // console.log("xThe new value is " + value);
    });

    yController.onChange(function(value) {
      // Fires on every change, drag, keypress, etc.
      // console.log("yThe new value is " + value);
      if(utils.gui.previewValueY == null){
        utils.gui.previewValueY = 0;
        utils.gui.previewValueX = null;
        utils.gui.previewValueZ = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      utils.selectedObject.position.y = utils.selectedObject.position.y + (value - utils.gui.previewValueY);
      utils.gui.previewValueY = value;

    });

    zController.onChange(function(value) {
      // Fires on every change, drag, keypress, etc.
      // console.log("yThe new value is " + value);
      if(utils.gui.previewValueZ == null){
        utils.gui.previewValueZ = 0;
        utils.gui.previewValueX = null;
        utils.gui.previewValueY = null;
      }
      if(utils.selectedObject instanceof Physijs.BoxMesh ){
        utils.selectedObject.__dirtyPosition = true;
      }
      utils.selectedObject.position.z = utils.selectedObject.position.z + (value - utils.gui.previewValueZ);
      utils.gui.previewValueZ = value;

    });

    xController.onFinishChange(function(value) {
      // Fires when a controller loses focus.
      var currentPosition = utils.selectedObject.position;
      
      if(utils.selectedObject.updatePositiontoServer != undefined){
        // console.log(currentPosition.z);
        utils.selectedObject.updatePositiontoServer(currentPosition.x,currentPosition.y,currentPosition.z,utils.selectedObject._id);
      }
    });

    yController.onFinishChange(function(value) {
      // Fires when a controller loses focus.
      var currentPosition = utils.selectedObject.position;
      
      if(utils.selectedObject.updatePositiontoServer != undefined){
        utils.selectedObject.updatePositiontoServer(currentPosition.x,currentPosition.y,currentPosition.z,utils.selectedObject._id);
      }
    });

    zController.onFinishChange(function(value) {
      // Fires when a controller loses focus.
      var currentPosition = utils.selectedObject.position;
      
      if(utils.selectedObject.updatePositiontoServer != undefined){
        utils.selectedObject.updatePositiontoServer(currentPosition.x,currentPosition.y,currentPosition.z,utils.selectedObject._id);
      }
    });


    rxController.onFinishChange(function(value) {
      var currentRotation = utils.selectedObject.rotation;
      if(utils.selectedObject.updateRotationtoServer != undefined){
        utils.selectedObject.updateRotationtoServer(currentRotation.x,currentRotation.y,currentRotation.z,utils.selectedObject._id);
      }
    });

    ryController.onFinishChange(function(value) {
      var currentRotation = utils.selectedObject.rotation;
      if(utils.selectedObject.updateRotationtoServer != undefined){
        utils.selectedObject.updateRotationtoServer(currentRotation.x,currentRotation.y,currentRotation.z,utils.selectedObject._id);
      }
    });

    rzController.onFinishChange(function(value) {
      var currentRotation = utils.selectedObject.rotation;
      if(utils.selectedObject.updateRotationtoServer != undefined){
        utils.selectedObject.updateRotationtoServer(currentRotation.x,currentRotation.y,currentRotation.z,utils.selectedObject._id);
      }
    });

    suController.onFinishChange(function(value) {
      var currentScale = utils.selectedObject.scale;
      if(utils.selectedObject.updateScaletoServer != undefined){
        utils.selectedObject.updateScaletoServer(currentScale.x,currentScale.y,currentScale.z,utils.selectedObject._id);
      }
    });

    sdController.onFinishChange(function(value) {
      var currentScale = utils.selectedObject.scale;
      if(utils.selectedObject.updateScaletoServer != undefined){
        utils.selectedObject.updateScaletoServer(currentScale.x,currentScale.y,currentScale.z,utils.selectedObject._id);
      }
    });

    user.products = [];
    user.booths = [];
    user.belongs = {};
    user.booth = { position: {}};


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




      VE.scene = new Physijs.Scene();
      VE.scene.name = "hall";
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


      /** male bBox data ****************************
      max: THREE.Vector3
      x: 39.299088
      y: 182.911041
      z: 18.226076
      min: THREE.Vector3
      x: -41.051979
      y: 0.413709
      z: -24.715677
      *****************************/

      /********************************************************************************************/
      $.get('/fethcAllBooths', function(data) {

        data.forEach(function(value) {
          VE.booths(value);
        });

        // VE.camera.position.set(-2740, 0, 1990);
        // console.log();
        if(user.booth.position.x != undefined){
          VE.camera.position.set(user.booth.position.x, -300, user.booth.position.z+1000);
        }
        // VE.camera.lookAt(new THREE.Vector3(user.booth.position.x,-200,-1000));
        // console.log(VE.scene.position);


      });

      $.get('/data/models', function(datas) {
        var bBox;
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
                child.geometry.computeBoundingBox();
                bBox = child.geometry.boundingBox;
              }
            });
            object.position.set(value.x,value.y,value.z);
            if(value.scale == undefined){
              var ll = bBox.max.x - bBox.min.x;
              var ww = bBox.max.z - bBox.min.z;
              var hh = bBox.max.y - bBox.min.y;
              var maxV = Math.max(ll,ww,hh);
              var ratio;
              if((maxV < 180) || (maxV > 185)){
                ratio = 180 / maxV;
                object.scale.set(ratio, ratio, ratio);
              }
            }else {
              object.scale.set(value.scale,value.scale,value.scale);
            }
            
            if(value.xr != undefined){
              object.rotation.x = value.xr;
            }
            if(value.yr != undefined){
              object.rotation.y = value.yr;
            }
            if(value.zr != undefined){
              object.rotation.z = value.zr;
            }
            object._id = value._id;
            object.updatePositiontoServer = function(x,y,z,id){
              $.post('/updateModelPosition/'+id,{'xp':x,'zp':z,'yp':y},function(data){ });
            };
            object.updateRotationtoServer = function(x,y,z,id){
              $.post('/updateModelRotation/'+id,{'xr':x,'zr':z,'yr':y},function(data){ });
            };
            object.updateScaletoServer = function(x,y,z,id){
              $.post('/updateModelScale/'+id,{'xs':x,'zs':z,'ys':y},function(data){ });
            };
            socket.on("updateModelPosition", function(data) {
              if(data._id == object._id){
                console.log(object._id);
                object.position.set(data.x,data.y,data.z);
              }
            });
            user.products.push(object);
            utils.sceneChildren.push(object);
            VE.scene.add(object);

          });
        });
      });


    $.get('/data/photos', function(datas) {

      datas.forEach(function(value) {

        var photoTexture = new THREE.ImageUtils.loadTexture('/data/' + value.photoId);
        var cubeMaterial = new THREE.MeshBasicMaterial({
                             map:photoTexture,
                             side:THREE.DoubleSide
                         });
        var cubeGeometry = new THREE.CubeGeometry(80, 80, 1);
        var cubePhoto = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubePhoto.position.set(value.x,value.y,value.z);
        cubePhoto._id = value._id;

        cubePhoto.updatePositiontoServer = function(x,y,z,id){
          $.post('/updatePhotoPosition/'+id,{'xp':x,'zp':z,'yp':y},function(data){ });
        };
        object.updateRotationtoServer = function(x,y,z,id){
          $.post('/updatePhototRotation/'+id,{'xr':x,'zr':z,'yr':y},function(data){ });
        };
        object.updateScaletoServer = function(x,y,z,id){
          $.post('/updatePhotoScale/'+id,{'xs':x,'zs':z,'ys':y},function(data){ });
        };
        socket.on("updatePhotoPosition", function(data) {
          if(data._id == cubePhoto._id){
            console.log(cubePhoto._id);
            cubePhoto.position.set(data.x,data.y,data.z);
          }
        });
        user.products.push(cubePhoto);
        utils.sceneChildren.push(cubePhoto);
        VE.scene.add(cubePhoto);

      });
    });


    socket.on("newModel", function(value) {

      var photoTexture = new THREE.ImageUtils.loadTexture('/data/' + value.photoId);
      var cubeMaterial = new THREE.MeshBasicMaterial({
                           map:photoTexture,
                           side:THREE.DoubleSide
                       });
      var cubeGeometry = new THREE.CubeGeometry(80, 80, 1);
      var cubePhoto = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubePhoto.position.set(value.x,value.y,value.z);
      cubePhoto._id = value._id;

      cubePhoto.updatePositiontoServer = function(x,y,z,id){
        $.post('/updatePhotoPosition/'+id,{'xp':x,'zp':z,'yp':y},function(data){ });
      };
      object.updateRotationtoServer = function(x,y,z,id){
        $.post('/updateModelRotation/'+id,{'xr':x,'zr':z,'yr':y},function(data){ });
      };
      object.updateScaletoServer = function(x,y,z,id){
        $.post('/updateModelScale/'+id,{'xs':x,'zs':z,'ys':y},function(data){ });
      };
      socket.on("updatePhotoPosition", function(data) {
        if(data._id == cubePhoto._id){
          console.log(cubePhoto._id);
          cubePhoto.position.set(data.x,data.y,data.z);
        }
      });
      user.products.push(cubePhoto);
      utils.sceneChildren.push(cubePhoto);
      VE.scene.add(cubePhoto);

    });

      /*get 
      var loader = new THREE.OBJLoader();
      loader.load( mURL, function ( object ) {
          object.traverse(function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  child.geometry.computeBoundingBox();
                  var bBox = child.geometry.boundingBox;
              }
          });
      };
      */
      socket.on("newPhoto", function(value) {
        var photoTexture = new THREE.ImageUtils.loadTexture('/data/' + value.photoId);
        var cubeMaterial = new THREE.MeshBasicMaterial({
                             map:photoTexture,
                             side:THREE.DoubleSide
                         });
        var cubeGeometry = new THREE.CubeGeometry(80, 80, 1);
        var cubePhoto = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cubePhoto.position.set(value.x,value.y,value.z);
        cubePhoto._id = value._id;

        cubePhoto.updatePositiontoServer = function(x,y,z,id){
          $.post('/updatePhotoPosition/'+id,{'xp':x,'zp':z,'yp':y},function(data){ });
        };
        object.updateRotationtoServer = function(x,y,z,id){
          $.post('/updatePhototRotation/'+id,{'xr':x,'zr':z,'yr':y},function(data){ });
        };
        object.updateScaletoServer = function(x,y,z,id){
          $.post('/updatePhotoScale/'+id,{'xs':x,'zs':z,'ys':y},function(data){ });
        };
        socket.on("updatePhotoPosition", function(data) {
          if(data._id == cubePhoto._id){
            console.log(cubePhoto._id);
            cubePhoto.position.set(data.x,data.y,data.z);
          }
        });
        user.products.push(cubePhoto);
        utils.sceneChildren.push(cubePhoto);
        VE.scene.add(cubePhoto);
  
      });





      /*******************test area**********************************************************/
 

      /*****************************************************************/



      socket.on("newBooth", function(data) {

        // console.log(socket.socket.sessionid);
        // console.log(data);
        VE.booths(data);

      });


      VE.initEventHandling = MouseControl(VE);
      VE.initEventHandling();
      // first render
      VE.renderer.render(VE.scene, VE.camera);

      VE.controls = new THREE.FirstPersonControls(VE.camera);
      VE.controls.movementSpeed = 90;
      VE.controls.noFly = true;
      VE.controls.lookVertical = false;
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

      if(utils.selectedObject != null){
        utils.gui.domElement.style.display = 'block';
      }else{
        FizzyText.reset();
        utils.gui.resetPreviewValue();
        utils.gui.domElement.style.display = 'none';

      }
      // if (VE.demo !== null) {
      //   VE.demo__dirtyPosition = true;
      // }
      VE.controls.update(VE.clock.getDelta());
      VE.renderer.render(VE.scene, VE.camera);

      /************************object transparent***************************************************/
      // var utils.INTERSECTED;
      
      utils.raycaster = utils.projector.pickingRay(VE.mouseVector.clone(), VE.camera);
      // var intersects = raycaster.intersectObjects( VE.scene.children );
      // utils.intersects = utils.raycaster.intersectObjects(user.products);
      if(user.role == "organizer"){
        // utils.sceneChildren = VE.scene.children.slice(7,-1);
        utils.intersects = utils.raycaster.intersectObjects(utils.sceneChildren,true);
        // utils.intersects = utils.raycaster.intersectObjects(VE.scene.children);
      }else if(user.role == "exhibitor"){
        utils.intersects = utils.raycaster.intersectObjects(user.products,true);
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