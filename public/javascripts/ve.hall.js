window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Hall = {};

VE.Hall.booths = [];

VE.Hall.generateBooths = function() {
//  console.log("testing generate");
  var box = {
    width: 100,
    height: 100,
    depth: 100,
    x: 10,
    y: -VE.boundingBoxConfig.height/2,
    z: 10
  }

  VE.Hall.booths.push(VE.Booth.create(box));
//  console.log(VE.Hall.booths);
};

VE.Hall.addBoothToScene = function() {
  VE.Hall.generateBooths();
  var booths = VE.Hall.booths;
  for(var i=0; i<booths.length; i++) {
    VE.scene.add(booths[i]);
  }
  }