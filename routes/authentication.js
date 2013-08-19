module.exports = function(app, models,sio) {

	app.post('/login', function(req, res) {
		console.log('login request');
		var email = req.param('email', null);
		var password = req.param('password', null);

		if (null == email || email.length < 1 || null == password || password.length < 1) {
			res.send(400);
			return;
		}

		models.Account.login(email, password, function(account) {
			if (!account) {
				res.send(401);
				return;
			}
			console.log(account.name.first);
			console.log('login was successful');
			req.session.loggedIn = true;
			req.session.accountId = account._id;
			req.session.role = account.role;
			req.session.username = account.name.full;
			res.send({id:account._id,role:account.role});
		});
	});

	app.post('/register', function(req, res) {
		var firstName = req.param('firstName', '');
		var lastName = req.param('lastName', '');
		var email = req.param('email', null);
		var password = req.param('password', null);
		var role = req.param('role', null);
		if (null == email || null == password) {
			res.send(400);
			return;
		}
		models.Account.register(email, password, firstName, lastName,role);
		res.send(200);
	});

	app.get('/account/authenticated', function(req, res) {
		if (req.session && req.session.loggedIn) {
			res.send(req.session.accountId);
		} else {
			res.send(401);
		}
	});

	app.get('/account/logout', function(req, res) {
		// if (req.session && req.session.loggedIn) {
		// 	res.send(req.session.accountId);
		// } else {
		// 	res.send(401);
		// }
		req.session.loggedIn = false;
		res.send(200);
		console.log("logout: "+req.session.accountId);
	});

	app.post('/forgotpassword', function(req, res) {
		var hostname = req.headers.host;
		var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
		var email = req.param('email', null);
		if (null == email || email.length < 1) {
			res.send(400);
			return;
		}
		Account.forgotPassword(email, resetPasswordUrl, function(success) {
			if (success) {
				res.send(200);
			} else {
				// Username or password not found
				res.send(404);
			}
		});
	});


	app.get('/resetPassword', function(req, res) {
		var accountId = req.param('account', null);
		res.render('resetPassword.jade', {
			locals: {
				accountId: accountId
			}
		});
	});


	app.post('/resetPassword', function(req, res) {
		var accountId = req.param('accountId', null);
		var password = req.param('password', null);
		if (null != accountId && null != password) {
			models.Account.changePassword(accountId, password);
		}
		res.render('resetPasswordSuccess.jade');
	});


};