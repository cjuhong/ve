define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';
	window.VE = window.VE || {};

	

	var booths = function(xp,zp,id) {
		var zp = typeof zp !== 'undefined' ? zp : -200;
		var id = typeof id !== 'undefined' ? id : "1111111";

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
		back_wall.position.z = zp;
		back_wall.position.x = xp;

		var left_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		left_wall.position.x = -205;
		left_wall.position.z = 195;
		back_wall.add(left_wall);

		var right_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 400, 400), wall_material);
		right_wall.position.x = 205;
		right_wall.position.z = 195;
		back_wall.add(right_wall);
		/******************************************************************************************/
		var x = document.createElement("canvas");
		var xc = x.getContext("2d");


		// xc.fillStyle = "red";
		// xc.fillRect(0, 0, 128, 128);

		xc.fillStyle = "orange";
		xc.font = "60pt monospace";
		xc.fillText(12, 64, 64);

		var xm = new THREE.MeshBasicMaterial({ map: new THREE.Texture(x), transparent: false });
		xm.map.needsUpdate = true;
		xm.map.wrapS = xm.map.wrapT = THREE.RepeatWrapping;
		xm.map.repeat.set(1, 1);

		var cubeMaterials = [
			new THREE.MeshBasicMaterial({
				color: 0x888888
			}),
			new THREE.MeshBasicMaterial({
				color: 0x888888
			}),
			new THREE.MeshBasicMaterial({
				color: 0x888888
			}),
			new THREE.MeshBasicMaterial({
				color: 0x888888
			}),
			xm,
			new THREE.MeshBasicMaterial({
				color: 0x888888
			})
		];

		// Create a MeshFaceMaterial, which allows the cube to have different materials on 
		// each face  0x00FF00
		var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

		// Create a mesh and insert the geometry and the material. Translate the whole mesh 
		// by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene. 
		// cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
		//new THREE.MeshBasicMaterial({ color: 0x888888 })
		/******************************************************************************************/
		var top_wall = new Physijs.BoxMesh(new THREE.CubeGeometry(420, 20, 400), cubeMaterial);
		top_wall.position.z = 195;
		top_wall.position.y = 210;
		back_wall.add(top_wall);
		
		back_wall.id = id;
		back_wall.updatePositiontoServer = function(x,y,z,id){
			$.post('/booth/updateBoothPosition/'+id,{'xp':x,'zp':z},function(data){
			  // console.log(data);
			});
			// console.log("updatePositiontoServer " +"x: " + x +"z: " + z);
			// console.log("message");
			socket.emit("updatePosition", {"x": x, "y":y, "z":z,"id":id});
			// socket.on(id, function(data) {
			// 	console.log(data);
			// });
		};

		VE.scene.add(back_wall);
		utils.sceneChildren.push(back_wall);
		user.booths.push(back_wall);
		socket.on(id, function(data) {
			// back_wall.updatePositiontoServer(data.x,data.y,data.z,data.id);
			back_wall.__dirtyPosition = true;
			back_wall.position.z = data.z;
			back_wall.position.x = data.x;
			// console.log("position change");
			// console.log(back_wall.position.z);
			// console.log(back_wall.position.x);
			console.log("from socket x: " + back_wall.position.x + " z: "+ back_wall.position.z);

		});

	};
	return booths;
});