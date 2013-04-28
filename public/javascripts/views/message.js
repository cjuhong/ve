define(['VeView', 'text!templates/message.html','views/login'], function(VeView, messageTemplate,LoginView) {
	var MessageView = VeView.extend({
		el: $('#interacts'),
		initialize: function(options) {
			that = this;
			this.navigationSly = options.navigationSly;
		},
		events: {
			"click #enter": "navigationTo"
		},
		navigationTo: function() {
			$('#interacts').fadeOut();
			// this.navigationSly.init();
			this.navigationSly.slideTo(0);
		},
		render: function() {
			this.$el.html(messageTemplate).fadeIn();
		}
	});

	return MessageView;
});