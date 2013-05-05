define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';

	var wall_one_material = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('/textures/wall_one.jpg')
	}), .8, // high friction
	.4 // low restitution
	);
	wall_one_material.map.wrapS = wall_one_material.map.wrapT = THREE.RepeatWrapping;
	wall_one_material.map.repeat.set(1, 1);

	// Ground
	var wall_one = new Physijs.BoxMesh(
	new THREE.CubeGeometry(1, 720, 4000),
	//new THREE.PlaneGeometry(50, 50),
	wall_one_material,
	0 // mass
	);
	wall_one.receiveShadow = true;
	wall_one.position.set(2745,0,0);


	var wall_one_opposite_material = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('/textures/wall_one.jpg')
	}), .8, // high friction
	.4 // low restitution
	);
	wall_one_opposite_material.map.wrapS = wall_one_opposite_material.map.wrapT = THREE.RepeatWrapping;
	wall_one_opposite_material.map.repeat.set(1, 1);

	// Ground
	var wall_one_opposite = new Physijs.BoxMesh(
	new THREE.CubeGeometry(1, 720, 4000),
	//new THREE.PlaneGeometry(50, 50),
	wall_one_opposite_material,
	0 // mass
	);
	wall_one_opposite.receiveShadow = true;
	wall_one_opposite.position.set(-2745,0,0);



	var wall_two_material = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('/textures/wall_two.jpg')
	}), .8, // high friction
	.4 // low restitution
	);
	wall_two_material.map.wrapS = wall_two_material.map.wrapT = THREE.RepeatWrapping;
	wall_two_material.map.repeat.set(1, 1);

	// Ground
	var wall_two = new Physijs.BoxMesh(
	new THREE.CubeGeometry(5500, 720, 1),
	//new THREE.PlaneGeometry(50, 50),
	wall_two_material,
	0 // mass
	);
	wall_two.receiveShadow = true;
	wall_two.position.set(0,0,1995);

	var wall_two_opposite_material = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('/textures/wall_two.jpg')
	}), .8, // high friction
	.4 // low restitution
	);
	wall_two_opposite_material.map.wrapS = wall_two_opposite_material.map.wrapT = THREE.RepeatWrapping;
	wall_two_opposite_material.map.repeat.set(1, 1);

	// Ground
	var wall_two_opposite = new Physijs.BoxMesh(
	new THREE.CubeGeometry(5500, 720, 1),
	//new THREE.PlaneGeometry(50, 50),
	wall_two_opposite_material,
	0 // mass
	);
	wall_two_opposite.receiveShadow = true;
	wall_two_opposite.position.set(0,0,-1995);



 	var walls = [wall_one, wall_one_opposite, wall_two, wall_two_opposite];
	return walls; 
	// return wall_one_opposite;
});