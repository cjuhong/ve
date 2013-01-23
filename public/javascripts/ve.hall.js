window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Hall = {};

VE.Hall.booths = [];

/**
 *  var boundingBoxConfig = {
 *   width: 3600,
 *   height: 360,
 *   depth: 2400,
 *   splitX: 60,
 *   splitY: 6,
 *   splitZ: 40
 *  };
 */

VE.Hall.generateBooths = function(boothSize) {
  //  console.log("testing generate");

  var boundingBoxConfig = VE.boundingBoxConfig;
  var box = {
    width: 200,
    height: 200,
    depth: 200,
    x: 0,
    y: 0-(VE.boundingBoxConfig.height/2 - 200/2),
    z: 0
  }
  if(VE.Utils.isEven(boothSize.row) && VE.Utils.isEven(boothSize.column)){
    var row = boothSize.row/2;
    var column = boothSize.column/2;
    for(var i= -column; i<column; i++) {
      box.z = 200 + i*400;
      for(var j= -row; j<row; j++) {
        box.x = 200 + j*400
        console.log(box.x);
        console.log(box.z);
        VE.Hall.booths.push(VE.Booth.create(box));
      }
      box.x = 0;
    }
  }else if(VE.Utils.isEven(boothSize.row) && !VE.Utils.isEven(boothSize.column)){
    console.log("hello column");
    var row = boothSize.row/2;
    var column = boothSize.column/2;
    for(var i= -Math.floor(column); i<Math.round(column); i++) {
      box.z = i*400;
      for(var j= -row; j<row; j++) {
        box.x = 200 + j*400
        console.log(box.x);
        console.log(box.z);
        VE.Hall.booths.push(VE.Booth.create(box));
      }
      box.x = 0;
    }
  }else if (!VE.Utils.isEven(boothSize.row) && VE.Utils.isEven(boothSize.column)){
    console.log("hello row");
    var row = boothSize.row/2;
    var column = boothSize.column/2;
    for(var i= -column; i<column; i++) {
      box.z = 200 + i*400;
      for(var j= -Math.floor(row); j<Math.round(row); j++) {
        box.x = j*400
        console.log(box.x);
        console.log(box.z);
        VE.Hall.booths.push(VE.Booth.create(box));
      }
      box.x = 0;
    }
  }else{
    console.log("hello column and row");
    var row = boothSize.row/2;
    var column = boothSize.column/2;
    for(var i= -Math.floor(column); i<Math.round(column); i++) {
      box.z = 200 + i*400;
      for(var j= -Math.floor(row); j<Math.round(row); j++) {
        box.x = 200 + j*400
        console.log(box.x);
        console.log(box.z);
        VE.Hall.booths.push(VE.Booth.create(box));
      }
      box.x = 0;
    }
  }

  //  console.log(VE.Utils.isEven(boothSize.row));
  //console.log(boundingBoxConfig);
};

VE.Hall.addBoothToScene = function() {
  var booths = VE.Hall.booths;
  for(var i=0; i<booths.length; i++) {
    VE.scene.add(booths[i]);
  }
}


VE.Hall.floor = function() {
  var map_texture = THREE.ImageUtils.loadTexture( "textures/tile-pattern.jpg" );
  var material = new THREE.SpriteMaterial( { map: map_texture, opacity: 1 } );
  var sprite = new THREE.Sprite( material );
  sprite.position.set( 0, 0, 0 );
  sprite.scale.set( 50, 50, 50 );
  VE.scene.add( sprite );
  console.log("sprite comes");
}