window.VE = window.VE  || {}; // equivalent to if(!window.VE) window.VE = {};

VE.Model = {};

VE.Model.testing = function() {
  console.log("testing");
};

VE.Model.loader = function() {
  var ambient = new THREE.AmbientLight( 0x101030 );
  VE.scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  VE.scene.add( directionalLight );

  var texture = new THREE.Texture();
  var loaderImg = new THREE.ImageLoader();
  loaderImg.addEventListener( 'load', function ( event ) {
    texture.image = event.content;
    texture.needsUpdate = true;
  } );
  loaderImg.load( 'textures/ash_uvgrid01.jpg' );

  // model
  var loaderObj = new THREE.OBJLoader();
  loaderObj.addEventListener( 'load', function ( event ) {
    var object = event.content;
    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
        child.material.map = texture;
      }
    } );
    VE.scene.add( object );
  });
  loaderObj.load( 'model/obj/male02.obj' );
};