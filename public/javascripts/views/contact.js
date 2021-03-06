define(['VeView', 'text!templates/contact.html'],

function(VeView, contactTemplate) {
	var contactView = VeView.extend({
		addButton: false,
		removeButton: false,
		tagName: 'li',
		events: {
			"click .addbutton": "addContact",
			"click .removebutton": "removeContact"
		},
		addContact: function() {
			var that = this;
			var $responseArea = this.$('.actionarea');
			$.post('/accounts/me/contact', {
				contactId: this.model.get('_id')
			}).done(function onSuccess() {
				$responseArea.text('Contact Added');
				var contact = that.model.toJSON();
				console.log(that.model);
				that.navigationSly.add('<li id=' + contact._id + ' class=contact' + '>' + contact.name.first + '</li>');
			}).fail(function onError() {
				$responseArea.text('Could not add contact');
			});
		},
		removeContact: function() {
			var that = this;
			var $responseArea = this.$('.actionarea');
			$responseArea.text('Removing contact...');
			$.ajax({
				url: '/accounts/me/contact',
				type: 'DELETE',
				data: {
					contactId: this.model.get('accountId')
				}
			}).done(function onSuccess() {
				$responseArea.text('Contact Removed');
				that.navigationSly.remove($('#'+that.model.get('accountId')));
				console.log($('#'+that.model.get('accountId')));
			}).fail(function onError() {
				$responseArea.text('Could not remove contact');
			});
		},
		initialize: function(options) {
			this.navigationSly = options.navigationSly;
			// Set the addButton variable in case it has been added in the constructor
			console.log(this.navigationSly);
			if (this.options.addButton) {
				this.addButton = this.options.addButton;
			}
			if (this.options.removeButton) {
				this.removeButton = this.options.removeButton;
			}
		},
		render: function() {
			$(this.el).html(_.template(contactTemplate, {
				model: this.model.toJSON(),
				addButton: this.addButton,
				removeButton: this.removeButton
			}));
			return this;
		}
	});
	return contactView;
});