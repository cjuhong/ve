define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';


    var initEventHandling = function(VE) {
      var handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleWheelFirefox;
      var projector = new THREE.Projector();
      

      handleMouseDown = function(evt) {
        var ray, intersections;
        switch (evt.button) {
          case 0:
            VE.mouseVector.x = 2 * (evt.clientX / window.innerWidth) - 1;
            mouseVector.y = 1 - 2 * (evt.clientY / window.innerHeight);
            var raycaster = projector.pickingRay(mouseVector.clone(), VE.camera);
            // var intersects = raycaster.intersectObjects( VE.scene.children );
            var intersects = raycaster.intersectObjects(VE.scene.children);

            // console.log(intersects);
            if (intersects.length > 0) {
              console.log(intersects[0]);
            }
            break;
          case 1:
            break;
          case 2:
            break;
        }
      };

      handleMouseMove = function(evt) {
        VE.mouseVector.x = 2 * (evt.clientX / window.innerWidth) - 1;
        VE.mouseVector.y = 1 - 2 * (evt.clientY / window.innerHeight);
        // var raycaster = projector.pickingRay(mouseVector.clone(), VE.camera);
        // var intersects = raycaster.intersectObjects( VE.scene.children );
        // var intersects = raycaster.intersectObjects(VE.blocks);

        // console.log(intersects);
        // console.log(VE.mouseVector);
        // if(intersects.length > 0){
        //   console.log(intersects[0]);
        // var targetObject = intersects[0];
        // var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
        // var outlineMesh2 = new THREE.Mesh( targetObject, outlineMaterial2 );
        // outlineMesh2.position = cube.position;
        // outlineMesh2.scale.multiplyScalar(1.05);
        // VE.scene.add( outlineMesh2 );
        // }


      };

      handleMouseUp = function(evt) {

      };

      handleWheel = function(evt) {
        var cameraY = VE.camera.position.y + evt.wheelDelta / 12;
        VE.camera.position.set(-2740, cameraY, 1990);
      };
      handleWheelFirefox = function(evt) {
        var cameraY = VE.camera.position.y + evt.detail * 3;
        VE.camera.position.set(-2740, cameraY, 1990);
      };
      return function() {
        VE.renderer.domElement.addEventListener('mousedown', handleMouseDown);
        VE.renderer.domElement.addEventListener('mousemove', handleMouseMove);
        VE.renderer.domElement.addEventListener('mouseup', handleMouseUp);
        VE.renderer.domElement.addEventListener('mousewheel', handleWheel);
        VE.renderer.domElement.addEventListener('DOMMouseScroll', handleWheelFirefox);
      };
    };

	return initEventHandling;
});