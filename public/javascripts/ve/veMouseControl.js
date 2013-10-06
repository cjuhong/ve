define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';
  window.utils = window.utils || {};

    var initEventHandling = function(VE) {
      var handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleWheelFirefox;
      var projector = new THREE.Projector();
      var x,y,z,id;
      

      handleMouseDown = function(evt) {
        // console.log(sessionStorage.role);
        // user.role = sessionStorage.role;

        // console.log(VE.scene.children);

        // console.log(utils.sceneChildren);
        // $.ajax("/account/authenticated", {
        //   method: "GET",VE.scene.children
        //   success: function(data) {
        //     console.log(data);
        //   },
        //   error: function(data) {
        //     return data;
        //   }
        // });
        // console.log(utils.intersect_plane);
        var ray, intersections;
        switch (evt.button) {
          case 0:
            utils.raycaster = utils.projector.pickingRay(VE.mouseVector.clone(), VE.camera);
            if(user.role == "organizer"){
              utils.selectedProducts = utils.raycaster.intersectObjects(utils.sceneChildren,true);
            }else if(user.role == "exhibitor"){
              utils.selectedProducts = utils.raycaster.intersectObjects(user.products,true);
            }else{
              utils.selectedProducts = [];
            }
            
            if (utils.selectedProducts.length > 0) {
              utils.selectedProduct = utils.selectedProducts[0].object;
              if(utils.selectedProduct.parent.name == "hall"){
                utils.intersect_plane.position.y = utils.selectedProduct.position.y;
                utils.selectedObject = utils.selectedProduct;
              }else{
                utils.intersect_plane.position.y = utils.selectedProduct.parent.position.y;
                utils.selectedObject = utils.selectedProduct.parent;
              }
            }
            // console.log(utils.intersect_plane.position);
              // if (utils.INTERSECTED != utils.intersects[0].object) {
            // VE.mouseVector.x = 2 * (evt.clientX / window.innerWidth) - 1;
            // mouseVector.y = 1 - 2 * (evt.clientY / window.innerHeight);
            // var raycaster = projector.pickingRay(mouseVector.clone(), VE.camera);
            // // var intersects = raycaster.intersectObjects( VE.scene.children );
            // var intersects = raycaster.intersectObjects(VE.scene.children);

            // // console.log(intersects);
            // if (intersects.length > 0) {
            //   console.log(intersects[0]);
            // }
            break;
          case 1:
            break;
          case 2:
            utils.selectedObject = null;
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
        utils.raycaster = utils.projector.pickingRay(VE.mouseVector.clone(), VE.camera);
        utils.testObject = utils.raycaster.intersectObject(utils.intersect_plane);
        if((utils.selectedProduct != null) && (utils.testObject.length > 0)){
          if(utils.selectedProduct instanceof Physijs.BoxMesh ){
            utils.selectedProduct.__dirtyPosition = true;
          }
            if(utils.selectedProduct.parent.name == "hall"){
              utils.selectedProduct.position.x = utils.testObject[0].point.x;
              utils.selectedProduct.position.z = utils.testObject[0].point.z;
            }else{
              utils.selectedProduct.parent.position.x = utils.testObject[0].point.x;
              utils.selectedProduct.parent.position.z = utils.testObject[0].point.z;
            }

            // utils.selectedProduct.position.x = utils.testObject[0].point.x;
            // utils.selectedProduct.position.z = utils.testObject[0].point.z;
            
            
          // utils.selectedProduct.__dirtyPosition = true;

        }
        

      };

      handleMouseUp = function(evt) {
        if(utils.selectedProduct != null) {
        x = utils.selectedProduct.position.x;
        y = utils.selectedProduct.position.y;
        z = utils.selectedProduct.position.z;
        id = utils.selectedProduct.id;

        if(utils.selectedProduct.updatePositiontoServer != undefined){
          utils.selectedProduct.updatePositiontoServer(x,y,z,id);
        }
        utils.selectedProduct = null;
      }
      };

      handleWheel = function(evt) {
        var cameraY = VE.camera.position.y + evt.wheelDelta / 12;
        // VE.camera.position.set(-2740, cameraY, 1990);
        VE.camera.position.y = cameraY;
      };
      handleWheelFirefox = function(evt) {
        var cameraY = VE.camera.position.y + evt.detail * 3;
        // VE.camera.position.set(-2740, cameraY, 1990);
        VE.camera.position.y = cameraY;
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