
    VE.initEventHandling = (function() {
      var _vector = new THREE.Vector3,
        projector = new THREE.Projector(),
        handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleWheelFirefox;

      handleMouseDown = function(evt) {
        var ray, intersections;
        switch (evt.button) {
          case 0:
            // if (VE.controls.activeLook) {
            //   VE.up = false;
            // }
            if (VE.up == true) {
              _vector.set(
                (evt.clientX / window.innerWidth) * 2 - 1, -(evt.clientY / window.innerHeight) * 2 + 1,
                1);
              projector.unprojectVector(_vector, VE.camera);
              ray = new THREE.Raycaster(VE.camera.position, _vector.sub(VE.camera.position).normalize());
              intersections = ray.intersectObjects(VE.blocks);
              VE.demo.setAngularFactor(_vector);
              VE.demo.setAngularVelocity(_vector);
              VE.demo.setLinearFactor(_vector);
              VE.demo.setLinearVelocity(_vector);
              VE.globals.mouse_position.copy(intersections[0].point);
              VE.demo.position.copy(intersections[0].point);
            } else {
              _vector.set(
                (evt.clientX / window.innerWidth) * 2 - 1, -(evt.clientY / window.innerHeight) * 2 + 1,
                1);
              projector.unprojectVector(_vector, VE.camera);
              ray = new THREE.Raycaster(VE.camera.position, _vector.sub(VE.camera.position).normalize());
              intersections = ray.intersectObjects(VE.blocks);
              if (intersections.length > 0) {
                if (intersections[0].object instanceof Physijs.BoxMesh) {
                  VE.globals.selected_block = intersections[0].object;
                  VE.demo = intersections[0].object;

                  _vector.set(0, 0, 0);
                  VE.globals.selected_block.setAngularFactor(_vector);
                  VE.globals.selected_block.setAngularVelocity(_vector);
                  VE.globals.selected_block.setLinearFactor(_vector);
                  VE.globals.selected_block.setLinearVelocity(_vector);
                  VE.globals.mouse_position.copy(intersections[0].point);
                  VE.globals.block_offset.subVectors(VE.globals.selected_block.position, VE.globals.mouse_position);

                  VE.intersect_plane.position.y = VE.globals.mouse_position.y;
                }
              }
            }
            break;
          case 2:
            if (!VE.controls.activeLook) {
              VE.up = true;
              // VE.scene.setGravity(new THREE.Vector3(0, 1000, 0));
              console.log('setGraveity');

            }

        }
      };

      handleMouseMove = function(evt) {

        var ray, intersection, _vector = new THREE.Vector3,

          i, scalar;


        if (VE.globals.selected_block !== null) {

          _vector.set(
            (evt.clientX / window.innerWidth) * 2 - 1, -(evt.clientY / window.innerHeight) * 2 + 1, 1);
          // console.log('mouse');
          // console.log(evt);
          projector.unprojectVector(_vector, VE.camera);
          // console.log(VE.camera.position);
          ray = new THREE.Raycaster(VE.camera.position, _vector.sub(VE.camera.position).normalize());
          intersection = ray.intersectObject(VE.intersect_plane);
          VE.globals.mouse_position.copy(intersection[0].point);
        }

      };

      handleMouseUp = function(evt) {

        if (VE.globals.selected_block !== null) {
          _vector.set(1, 1, 1);
          VE.globals.selected_block.setAngularFactor(_vector);
          VE.globals.selected_block.setLinearFactor(_vector);

          VE.globals.selected_block = null;
        }

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
    })();