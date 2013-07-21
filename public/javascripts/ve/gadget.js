define(['ve/gadget/desk','ve/gadget/booths'], function(Desk,Booths) {
	'use strict';
	var gadget = function(){
		// window.VE.desk = Desk;
		// console.log(Desk);
		window.VE = window.VE  || {};
		VE.desk = Desk;
		VE.booths = Booths;
	}

	return gadget();

});