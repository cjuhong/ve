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
  console.log(boothSize);
  var boundingBoxConfig = VE.boundingBoxConfig;
  var box = {
    width: 200,
    height: 200,
    depth: 200,
    x: 10,
    y: -VE.boundingBoxConfig.height/2,
    z: 10
  }

  for(var i=0; i<boothSize.row; i++) {
    for(var j=0; j<boothSize.column; j++) {

    }
  }

  VE.Hall.booths.push(VE.Booth.create(box));
//  console.log(boundingBoxConfig);
};

VE.Hall.addBoothToScene = function() {
  var booths = VE.Hall.booths;
  for(var i=0; i<booths.length; i++) {
    VE.scene.add(booths[i]);
  }
}