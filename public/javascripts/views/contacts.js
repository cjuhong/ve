define(['VeView', 'views/contact', 'text!templates/contacts.html'],

function(VeView, ContactView, contactsTemplate) {
	var contactsView = VeView.extend({
		el: $('#interacts'),
		events: {
			"click .close": "closeWindow"
		},
		closeWindow: function(){
		  $('#interacts').fadeOut();
		  console.log("closing");
		},
		initialize: function(options) {
			this.navigationSly = options.navigationSly;
			this.contactsCollection = options.contactsCollection;
			this.collection.on('reset', this.renderCollection, this);
		},
		render: function() {
			this.$el.html(contactsTemplate).fadeIn();
		},
		renderCollection: function(collection) {
			var that = this;
			collection.each(function(contact) {
				var statusHtml = (new ContactView({
					removeButton: true,
					model: contact,
					navigationSly: that.navigationSly
				})).render().el;
				// console.log(statusHtml);
				$(statusHtml).appendTo('.contacts_list');
			});
		}
	});
	return contactsView;
	//add over flow scroller bar over the window of interacts
	// add contacts control center
});