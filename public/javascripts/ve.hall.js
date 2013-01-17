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
    x: 10,
    y: -VE.boundingBoxConfig.height/2,
    z: 10
  }

  var row = boothSize.row/2;
  var column = boothSize.column/2;
  for(var i= -column; i<column; i++) {
    for(var j= -row; j<row; j++) {
      console.log(i);
      console.log(j);
    }
  }

  VE.Hall.booths.push(VE.Booth.create(box));
  //console.log(boundingBoxConfig);
};

VE.Hall.addBoothToScene = function() {
  var booths = VE.Hall.booths;
  for(var i=0; i<booths.length; i++) {
    VE.scene.add(booths[i]);
  }
}