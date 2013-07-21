define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';
	window.VE = window.VE  || {};
	var desk = function(xp) {

		// var combined = new THREE.Geometry();
		var top = new Physijs.BoxMesh(new THREE.CubeGeometry(200, 10, 200), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		top.position.x = xp;
		top.position.y = -260;
		top.position.z = 1500;
		// THREE.GeometryUtils.merge( combined, top );
		var _leg = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 100, 10), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		_leg.position.x = -100;
		_leg.position.y = -50;
		_leg.position.z = -100;
		top.add(_leg);
		// THREE.GeometryUtils.merge( combined, _leg );


		_leg = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 100, 10), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		_leg.position.x = 100;
		_leg.position.y = -50;
		_leg.position.z = -100;
		top.add(_leg);

		_leg = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 100, 10), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		_leg.position.x = 100;
		_leg.position.y = -50;
		_leg.position.z = 100;
		top.add(_leg);

		_leg = new Physijs.BoxMesh(new THREE.CubeGeometry(10, 100, 10), new THREE.MeshBasicMaterial({
			color: 0x888888
		}));
		_leg.position.x = -100;
		_leg.position.y = -50;
		_leg.position.z = 100;
		top.add(_leg);

		VE.blocks.push(top);
		VE.scene.add(top);
		// VE.blocks.push(box);
		// VE.scene.add( box );
	};


	return desk;

});