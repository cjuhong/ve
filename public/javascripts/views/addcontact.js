define(['NavigationSly','VeView', 'models/Contact', 'views/contact',
	'text!templates/addcontact.html'],

function(NavigationSly,VeView, Contact, ContactView, addcontactTemplate) {
	var addcontactView = VeView.extend({
		el: $('#interacts'),
		events: {
			"submit form": "search"
		},
		search: function() {
			var view = this;
			// console.log(this.$('form').serialize());
			$.post('/contacts/find',
			this.$('form').serialize(), function(data) {
				view.render(data);
			}).error(function() {
				$("#results").text('No contacts found.');
				$("#results").slideDown();
			});
			return false;
		},
		initialize: function(options) {
			this.navigationSly = NavigationSly;
			// console.log(NavigationSly);
		},
		render: function(resultList) {
			var view = this;
			this.$el.html(_.template(addcontactTemplate)).fadeIn();
			if (null != resultList) {
				_.each(resultList, function(contactJson) {
					var contactModel = new Contact(contactJson);
					var contactHtml = (new ContactView({
						addButton: true,
						navigationSly: view.navigationSly,
						model: contactModel
					})).render().el;
					$('#results').append(contactHtml);
				});
			}
		}
	});
	return addcontactView;
});