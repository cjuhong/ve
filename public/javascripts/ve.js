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
  VE.renderer = new THREE.WebGLRenderer({antialias:true});
  VE.camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                            ASPECT,
                                            NEAR,
                                            FAR  );
  VE.camera.position.set(0,0-(VE.boundingBoxConfig.height/2 - 200/2),500);



  VE.scene = new THREE.Scene();

//  VE.scene.fog = new THREE.Fog( 0xffffff, 1500, 2100 );
  VE.scene.add(VE.camera);

  var axis_helper = new THREE.AxisHelper(5000);
  VE.scene.add(axis_helper);

  //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  var light = new THREE.AmbientLight( 0xffeedd ); // strong white light
  VE.scene.add( light );
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
    document.getElementById("model_choice").style.display = "block";
    VE.pointsDOM = document.getElementById("points");
    VE.pointsDOM.style.display = "block";
//    VE.over = true;
    $("#operation").css("display","block");
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

  $("#booth_button").on('click', function() {
    document.getElementById("size").style.display = "block";
  });

  $("#exhibitor_button").on('click', function() {
    document.getElementById("exhibitor_login").style.display = "block";

  });

  $("#admin_button").on('click', function() {
    document.getElementById("admin_login").style.display = "block";
  });

  $("#ex_login").on('click', function() {
    document.getElementById("exhibitor_login").style.display = "none";
    $("#operation  .admin").css("display","none");
    $("#operation  .exhibitor").css("display","block");
    VE.controls = new THREE.FirstPersonControls( VE.camera );
    VE.controls.movementSpeed = 70;
    VE.controls.lookSpeed = 0.05;
    VE.controls.noFly = true;
    VE.controls.lookVertical = false;

    VE.start();
  });

  $("#ad_login").on('click', function() {
    document.getElementById("admin_login").style.display = "none";
    $("#operation  .exhibitor").css("display","none");
    $("#operation  .admin").css("display","block");
  });

  $("#visitor_button").on('click', function(event) {
    event.preventDefault();
    $("#operation  .admin").css("display","none");
    $("#operation  .exhibitor").css("display","none");

    VE.controls = new THREE.FirstPersonControls( VE.camera );
    VE.controls.movementSpeed = 70;
    VE.controls.lookSpeed = 0.05;
    VE.controls.noFly = true;
    VE.controls.lookVertical = false;

    VE.start();

  });

  document.getElementById("model_button").addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("model").style.display = "block";
    var model = {};
    //VE.boothSize.row = Number(row.value);
    //VE.boothSize.column = Number(column.value);
    //VE.start();
    $("#obj").on('change', function() {
      var obj = $(this).prop("files");
      var oFReader = new FileReader();
      oFReader.onload = function (FREvent) {
        //document.getElementById("uploadPreview").src = oFREvent.target.result;
        //console.log("obj");
        //console.log(FREvent.target.result);
        model.obj = FREvent.target.result;
      };
      oFReader.readAsDataURL(obj[0]);
    });

    $("#img").on('change', function() {
      var img = $(this).prop("files");
      var iFReader = new FileReader();
      iFReader.onload = function (FREvent) {
        //document.getElementById("uploadPreview").src = oFREvent.target.result;
       // console.log("img");
        //console.log(FREvent.target.result);
        model.img = FREvent.target.result;
      };
      iFReader.readAsDataURL(img[0]);
    });
    VE.Model.models.push(model);

  });

  document.getElementById("load").addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("model").style.display = "none";
    //var obj = document.getElementById("obj");
    //var img = document.getElementById("img");
    //console.log("hello model");
    console.log(VE.Model.models[0]);
    //bb = $("#obj").prop("files");
    VE.Model.loader(VE.Model.models[0]);
    //console.log(bb[0]);
    //VE.boothSize.row = Number(row.value);
    //VE.boothSize.column = Number(column.value);
    //VE.start();

  });
};
VE.DATGUI = function() {
  var FizzyText = function() {
    this.message = 'dat.gui';
    this.speed = 0.8;
    this.displayOutline = false;
    this.explode = function() { console.log("DATGUI") };
  // Define render logic ...
  };
  var text = new FizzyText();
  var gui = new dat.GUI({
    //height : 5 * 32 - 1
  });
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
}

VE.start = function() {
  VE.Hall.generateBooths(VE.boothSize);
  VE.Hall.addBoothToScene();
//  VE.Model.loader();
  VE.Hall.floor();
  VE.Hall.sprite();
  //VE.DATGUI();
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
  if(VE.controls.lookVertical == false) {
    if(VE.camera.position.z >= 1100) {
      VE.camera.position.set(VE.camera.position.x,0-(VE.boundingBoxConfig.height/2 - 200/2),1090);
    }
    if(VE.camera.position.x >= 1700) {
      VE.camera.position.set(1690,0-(VE.boundingBoxConfig.height/2 - 200/2),VE.camera.position.z);
    }
    if(VE.camera.position.z <= -1100) {
      VE.camera.position.set(VE.camera.position.x,0-(VE.boundingBoxConfig.height/2 - 200/2),-1090);
    }
    if(VE.camera.position.x <= -1700) {
      VE.camera.position.set(-1690,0-(VE.boundingBoxConfig.height/2 - 200/2),VE.camera.position.z);
    }
  }
  VE.controls.update(VE.clock.getDelta());
  VE.renderer.render(VE.scene, VE.camera);

  VE.stats.update();

  if(!VE.over) window.requestAnimationFrame(VE.animate);
};

window.addEventListener("load", VE.init);
