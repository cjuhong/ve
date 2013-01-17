window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Model = {};

VE.Model.testing = function() {
  console.log("testing");
};

VE.Model.loader = function() {
  var texture = new THREE.Texture();
  var loader = new THREE.ImageLoader();
  loader.addEventListener( 'load', function ( event ) {
    texture.image = event.content;
    texture.needsUpdate = true;
  } );
  loader.load( 'textures/ash_uvgrid01.jpg' );

  // model
  var loader = new THREE.OBJLoader();
  loader.addEventListener( 'load', function ( event ) {
    var object = event.content;
    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material.map = texture;
      }
    } );
    object.position.y = - 80;
    VE.scene.add( object );
  });
  loader.load( 'model/obj/male02.obj' );
};