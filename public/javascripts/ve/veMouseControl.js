define(['views/message', 'NavigationSly'], function(Message, NavigationSly) {
	'use strict';

	var initEventHandling = (function() {
		var handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleWheelFirefox;

		handleMouseDown = function(evt) {
			var ray, intersections;
			switch (evt.button) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
			}
		};

		handleMouseMove = function(evt) {

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
	})();

	return initEventHandling;
});