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

		var top = new Physijs.BoxMesh(new THREE.CubeGeometry(400, 10, 400), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		top.position.x = xp;
		top.position.y = 80;
		console.log(top.position.y);
		//back wall
		var _wall = new Physijs.BoxMesh(new THREE.CubeGeometry(400, 400, 10), wall_material_back);
		_wall.position.y = -200;
		_wall.position.z = -200;
		top.add(_wall);
		VE.blocks.push(_wall);

		//left wall
		_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		_wall.position.x = -200;
		_wall.position.y = -200;

		top.add(_wall);
		VE.blocks.push(_wall);


		//right wall
		_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		_wall.position.x = 200;
		_wall.position.y = -200;
		top.add(_wall);
		VE.blocks.push(_wall);

		VE.blocks.push(top);
		VE.scene.add(top);
	};
	return booths;
});