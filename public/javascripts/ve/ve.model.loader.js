window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Model = {};

VE.Model.models = [];

VE.Model.testing = function() {
  console.log("testing");
};

VE.Model.loader = function(model) {
  //var ambient = new THREE.AmbientLight( 0x101030 );
  //VE.scene.add( ambient );

  //var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  //directionalLight.position.set( 0, 0, 1 ).normalize();
  //VE.scene.add( directionalLight );

  //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  //var light = new THREE.AmbientLight( 0xffeedd ); // strong white light
  //VE.scene.add( light );
  var texture = new THREE.Texture();
  var loaderImg = new THREE.ImageLoader();
  loaderImg.addEventListener( 'load', function ( event ) {
    texture.image = event.content;
    texture.needsUpdate = true;
  } );
  loaderImg.load( model.img );
//  loaderImg.load( 'textures/ash_uvgrid01.jpg' );

  // model
  var loaderObj = new THREE.OBJLoader();
  loaderObj.addEventListener( 'load', function ( event ) {
    var object = event.content;
    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material.map = texture;
      }
    } );
    object.position.set(0,0-VE.boundingBoxConfig.height/2,300);
    object.scale.set(10.0,10.0,10.0);
    VE.scene.add( object );
  });
  loaderObj.load( model.obj );
//  loaderObj.load( 'model/obj/male02.obj' );
};