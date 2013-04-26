define(['views/navigation'], function(Navigation) {
	var navigation = new Navigation();
	navigation.render();
	var NavigationSly = new Sly('#basic',{
		horizontal: 1,
		itemNav: 'basic',
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 13,
		scrollBy: 1,
		activatePageOn: 'click',
		speed: 300,
		elasticBounds: 1,
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1
	});
	NavigationSly.init();
	return NavigationSly;
});