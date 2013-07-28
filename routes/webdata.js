module.exports = function(app, models) {
	var gridfs = models.gridfs;
	app.post('/data', function(req, res) {
		if (req.body.dataType == "model") {
			var options = {
				content_type: req.files.model.type
			};
			gridfs.putGridFileByPath(req.files.model.path, req.files.model.name, options, function(err, result) {
				var modelId = result.fileId;
				var modelName = result.filename;
				var options = {
					content_type: req.files.texture.type
				};
				gridfs.putGridFileByPath(req.files.texture.path, req.files.texture.name, options, function(err, result) {
					models.WebModel.uploadModel(req.session.accountId, result.fileId, modelId, req.body.dataTypes, modelName);
				});
			});

		}

		res.send(200);
	});
 
	app.get('/data/models', function(req, res) {
		if (req.session.loggedIn) {
		models.WebModel.findAll(req.session.accountId, function(models_data) {
			res.send(models_data);
		});
	}
	});


	app.post('/booth/updateBoothPosition/:id', function(req, res) {
		// models.WebModel.generateBooth();
		res.send("ok");
		console.log("backend");
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
				models.WebModel.generateBooth(req.session.accountId, req.session.username, xps[i], 200, 100);
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

};