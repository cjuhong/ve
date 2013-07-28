define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';
	window.VE = window.VE || {};

	var booths = function(xp) {

		var wall_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: THREE.ImageUtils.loadTexture('/textures/wall.jpg')
			}), .8, // high friction
			.4 // low restitution
		);
		wall_material.map.wrapS = wall_material.map.wrapT = THREE.RepeatWrapping;
		wall_material.map.repeat.set(1, 10);


		var wall_material_back = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: THREE.ImageUtils.loadTexture('/textures/wall_back.jpeg')
			}), .8, // high friction
			.4 // low restitution
		);
		wall_material_back.map.wrapS = wall_material_back.map.wrapT = THREE.RepeatWrapping;
		wall_material_back.map.repeat.set(1, 1);

		// var top = new Physijs.BoxMesh(new THREE.CubeGeometry(400, 10, 400), new THREE.MeshBasicMaterial({
		// 	color: 0x888888
		// }));
		// top.position.x = xp;
		// top.position.y = 80;
		// console.log(top.position.y);

		// var back_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(400, 400, 10), wall_material_back);
		// back_wall.position.y = -200;
		// back_wall.position.z = -200;
		// top.add(back_wall);

		// left_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		// left_wall.position.x = -200;
		// left_wall.position.y = -200;
		// top.add(left_wall);

		// right_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		// right_wall.position.x = 200;
		// right_wall.position.y = -200;
		// top.add(right_wall);

		// user.booths.push(top);
		// VE.scene.add(top);

		var back_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(400, 400, 10), wall_material_back);
		back_wall.position.y = -160;
		back_wall.position.z = -200;
		back_wall.position.x = xp;

		var left_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		left_wall.position.x = -205;
		left_wall.position.z = 195;
		back_wall.add(left_wall);

		var right_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		right_wall.position.x = 205;
		right_wall.position.z = 195;
		back_wall.add(right_wall);

		var top_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(420, 10, 400), new THREE.MeshBasicMaterial({ color: 0x888888 }));
		top_wall.position.z = 195;
		top_wall.position.y = 205;
		back_wall.add(top_wall);
		
		back_wall.updatePositiontoServer = function(x,y,z){
			$.post('/booth/updateBoothPosition/11111',function(data){
			  console.log(data);
			});
			console.log("updatePositiontoServer " +"x: " + x +"z: " + z);
		};

		VE.scene.add(back_wall);
		user.booths.push(back_wall);

	};
	return booths;
});