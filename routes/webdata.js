module.exports = function(app, models,sio) {
	var gridfs = models.gridfs;
	app.post('/data', function(req, res) {

		var bp = JSON.parse(req.body.bp);
		
		if (req.body.dataType == "model") {

			var options = {
				content_type: req.files['model']['type']
			};

			gridfs.putGridFileByPath(req.files.model.path, req.files.model.name, options, function(err, result) {
				var modelId = result.fileId;
				var modelName = result.filename;
				var options = {
					content_type: req.files['texture']['type']
				};
				gridfs.putGridFileByPath(req.files.texture.path, req.files.texture.name, options, function(err, result) {
					var modelData = models.WebModel.uploadModel(req.session.accountId, result.fileId, modelId, req.body.dataType, modelName,bp);
					sio.sockets.emit("newModel",modelData);
				});
			});

		}else {
			var options = {
				content_type: req.files['photo']['type']
			};
			gridfs.putGridFileByPath(req.files.photo.path, req.files.photo.name, options, function(err, result) {
				var photoName = result.filename;
				var photoData = models.WebModel.uploadPhoto(req.session.accountId, result.fileId, req.body.dataType, photoName,bp);
				sio.sockets.emit("newPhoto",photoData);
				console.log(photoData);
			});
		}

		res.send(200);
	});
 
	// app.get('/data/models', function(req, res) {
	// 	if (req.session.loggedIn) {
	// 		console.log("xxxxxxxxxxx log in");
	// 	models.WebModel.findAll(req.session.accountId, function(models_data) {
	// 		res.send(models_data);
	// 	});
	// }
	// });

	app.get('/data/models', function(req, res) {
		if (req.session.loggedIn) {
		models.WebModel.findAll(function(models_data) {
			res.send(models_data);
		});
	}
	});

	app.get('/data/photos', function(req, res) {
		if (req.session.loggedIn) {
		models.WebModel.findAllPhoto(function(photos_data) {
			res.send(photos_data);
		});
	}
	});

	app.post('/booth/updateBooth/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var exhibitor = req.body.exhibitor;
		var number = req.body.number;
		models.WebModel.findOneBooth(id,function(booth){
			booth.userId = exhibitor;
			booth.booth_num = number;
			booth.save(function(err){
				if(err){
					console.log(err);
					return;
				}
			});
			console.log(booth);
			sio.sockets.emit("updateBooth",booth);

		});
		res.send("ok");
		// console.log("backend");
		// console.log(id);
		// console.log(req.body);
	});

	app.post('/updatePhotoPosition/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var xp = req.body.xp;
		var yp = req.body.yp;
		var zp = req.body.zp;
		models.WebModel.findOnePhoto(id,function(photo){
			photo.x = xp;
			photo.y = yp;
			photo.z = zp;
			photo.save(function(err){
				if(err){
					console.log(err);
				}
			});
			sio.sockets.emit("updatePhotoPosition",photo);
		});
		res.send("ok");
	});



	app.post('/updateModelPosition/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var xp = req.body.xp;
		var yp = req.body.yp;
		var zp = req.body.zp;
		// console.log(req.body.zp);
		// console.log(xp);
		// console.log(yp);
		// console.log(zp);
		// console.log(id);
		// return;
		models.WebModel.findOneModel(id,function(model){
			console.log(model);
			console.log(zp);
			model.x = xp;
			model.y = yp;
			model.z = zp;
			// console.log(model.z);
			model.save(function(err){
				if(err){
					console.log(err);
				}
			});
			// console.log(model);
			sio.sockets.emit("updateModelPosition",model);


		});
		res.send("ok");
	});


	app.post('/booth/updateBoothPosition/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var xp = req.body.xp;
		var zp = req.body.zp;
		models.WebModel.findOneBooth(id,function(booth){
			console.log(booth);
			booth.x = xp;
			booth.z = zp;
			booth.save(function(err){
				if(err){
					console.log(err);
					return;
				}
			});

		});
		res.send("ok");
		// console.log("backend");
		// console.log(id);
		// console.log(req.body);
	});

	// models.WebModel.generateBooth('517cfa42faa4dcf41500000a','aaa', -800,200,100);
	// models.WebModel.fethcAllBooths(function(doc){
	//   // res.send(doc);
	//   console.log(doc);
	// });

	app.post('/generateBooth/:num', function(req, res) {
		var num = req.params.num;
		// console.log();
		var xps = req.body.xp;
		if (num > 0) {
			for (var i = 0; i < num; i++) {
				var newBooth = models.WebModel.generateBooth(req.session.accountId, req.session.username, xps[i], 200, 100);
				// console.log("new");
				// console.log(newBooth);
				// console.log("new");
				sio.sockets.emit("newBooth",newBooth);
			}
		}
	});

	app.get('/fethcAllBooths', function(req, res) {
		models.WebModel.fethcAllBooths(function(doc) {
			res.send(doc);
		});
	});

	app.get('/data/:id', function(req, res) {

		if (req.session.loggedIn) {
			gridfs.getGridFile(req.params.id, function(err, file) {
				res.header("Content-Type", file.type);
				res.header("Content-Disposition", "attachment; filename=" + file.filename);
				file.stream(true).pipe(res);
				// res.send(file);
			});
		} else {
			res.send("please log in.");
		}

	});


	app.post('/updateModelRotation/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var xr = req.body.xr;
		var yr = req.body.yr;
		var zr = req.body.zr;
		console.log(req.body);

		models.WebModel.findOneModel(id,function(model){
			console.log(model);
			model.xr = xr;
			model.yr = yr;
			model.zr = zr;
			// console.log(model.z);
			model.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log(model);
				}
			});
			sio.sockets.emit("updateModelRotation",model);
		});
		res.send("ok");
	});


	app.post('/updateModelScale/:id', function(req, res) {
		// models.WebModel.generateBooth();findOneBooth
		var id = req.params.id;
		var scale = req.body.xs;
		console.log(req.body);

		models.WebModel.findOneModel(id,function(model){
			console.log(model);
			model.scale = scale;

			// console.log(model.z);
			model.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log(model);
				}
			});
			sio.sockets.emit("updateModelScale",model);
		});
		res.send("ok");
	});

};