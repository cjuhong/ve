define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';

	var ground_material = Physijs.createMaterial(
	new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('/textures/ceiling.jpg')
	}), .8, // high friction
	.4 // low restitution
	);
	ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
	ground_material.map.repeat.set(6, 4);

	// Ground
	var ground = new Physijs.BoxMesh(
	new THREE.CubeGeometry(5500, 1, 4000),
	//new THREE.PlaneGeometry(50, 50),
	ground_material,
	0 // mass
	);
	ground.receiveShadow = true;
	ground.position.set(0,358,0);

	return ground;
});