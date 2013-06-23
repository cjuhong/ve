define(['VeView', 'text!templates/login.html'], function(VeView, loginTemplate) {
	var loginView = VeView.extend({
		requireLogin: false,
		el: $('#interacts'),
		events: {
			"submit form": "login"
		},

		login: function() {
			var socketEvents = this.socketEvents;
			var that = this;
			$.post('/login',
				this.$('form').serialize(), function(data) {
					console.log(data.id+ " " + data.role + " logging");
					sessionStorage.role = data.role;
					sessionStorage.userId = data.id;
					socketEvents.trigger('app:loggedin');
					$('#logout').fadeIn();
					$('#search').fadeIn();
					$('#contacts').fadeIn();
					$('#management').fadeIn();
					$('#register').fadeOut();
					$('#login').fadeOut();
					that.hide(data.role);
					$('#interacts').fadeOut();
					that.contactsCollection.url = '/accounts/me/contacts';
					that.contactsCollection.on('reset',that.addNavContacts, that);
					that.contactsCollection.fetch();
					window.location.hash = 'index';
				}).error(function(){
					$("#error").text('Unable to login.');
					$("#error").slideDown();
				});
			return false;
		},
		addNavContacts: function(data){
			var that = this;
		  that.contactsCollection.each(function(item){
		    var contact = item.toJSON();
		    that.navigationSly.add('<li id=' + contact.accountId + ' class=contact' + '>' + contact.name.first + '</li>');
		    // console.log(contact);
		  });
		},
		hide: function(role) {
			switch(role) {
				case 'vistor':
					$('#exhibitor').fadeOut();
					$('#organizer').fadeOut();
					break;
				case 'exhibitor':
					$('#vistor').fadeOut();
					$('#organizer').fadeOut();
					break;
				case 'organizer':
					$('#vistor').fadeOut();
					$('#exhibitor').fadeOut();
					break;
				default:
					break;
			}
		},
		initialize: function(options) {
			this.socketEvents = options.socketEvents;
			this.navigationSly = options.navigationSly;
			this.contactsCollection = options.contactsCollection;
		},
		render: function() {
			$(this.el).html(loginTemplate).fadeIn();
			$("#error").hide();
			$("input[name=email]").focus();
		}
	});
	return loginView;
});