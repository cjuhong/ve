module.exports = function(app, models,sio) {

	var utils = require('connect').utils;
	var cookie = require('cookie');
	var Session = require('connect').middleware.session.Session;
	
	sio.configure(function() {
		app.isAccountOnline = function(accountId) {
			var clients = sio.sockets.clients(accountId);
			return (clients.length > 0);
		};
		// console.log("isAccountOnline is here");
		// debugger;
		sio.set('authorization', function(data, accept) {
			var signedCookies = cookie.parse(data.headers.cookie);
			var cookies = utils.parseSignedCookies(signedCookies, app.sessionSecret);
			data.sessionID = cookies['express.sid'];
			data.sessionStore = app.sessionStore;
			data.sessionStore.get(data.sessionID, function(err, session) {
				if (err || !session) {
					return accept('Invalid session', false);
				} else {
					data.session = new Session(data, session);
					accept(null, true);
				}
			});
		});
		sio.sockets.on('connection', function(socket) {
			console.log("connection in server side");
			// debugger;
			var session = socket.handshake.session;
			var accountId = session.accountId;
			var sAccount = null;
			socket.join(accountId);
			app.triggerEvent('event:' + accountId, {
				from: accountId,
				action: 'login'
			});
			var handleContactEvent = function(eventMessage) {
				socket.emit('contactEvent', eventMessage);
			};
			var subscribeToAccount = function(accountId) {
				var eventName = 'event:' + accountId;
				app.addEventListener(eventName, handleContactEvent);
				console.log('Subscribing to ' + eventName);
			};
			models.Account.findById(accountId, function subscribeToFriendFeeds(account) {
				var subscribedAccounts = {};
				sAccount = account;
				account.contacts.forEach(function(contact) {
					if (!subscribedAccounts[contact.accountId]) {
						subscribeToAccount(contact.accountId);
						subscribedAccounts[contact.accountId] = true;
					}
				});
				if (!subscribedAccounts[accountId]) {
					// Subscribe to my own updates
					subscribeToAccount(accountId);
				}
			});
			socket.on('disconnect', function() {
				sAccount.contacts.forEach(function(contact) {
					var eventName = 'event:' + contact.accountId;
					app.removeEventListener(eventName, handleContactEvent);
					console.log('Unsubscribing from ' + eventName);
				});
				app.triggerEvent('event:' + accountId, {
					from: accountId,
					action: 'logout'
				});
			});
			socket.on('chatclient', function(data) {
				sio.sockets.in(data.to).emit('chatserver', {
					from: accountId,
					text: data.text
				});
			});

			socket.on('updatePosition', function(data) {
				// console.log(data);
				sio.sockets.emit(data.id,data);
			});
		});
	});
};