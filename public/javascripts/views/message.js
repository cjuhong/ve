define(['VeView', 'text!templates/message.html'], function(VeView, messageTemplate) {
	var MessageView = VeView.extend({
		el: $('#message'),
		initialize: function(options) {
			that = this;
			this.navigationSly = options.navigationSly;
			this.navigationSly.on('active',function(event,index){
				console.log(index);
				console.log(event);
				that.vistor();
			});
		},
		events: {
			"click #enter": "navigationTo",
			"click #vistor": "vistor",
			"click #exhibitor": "exhibitor",
			"click #organizer": "organizer",
		},
		vistor: function() {
			console.log("test");
		},
		exhibitor: function() {
			console.log("test");
		},
		organizer: function() {
			console.log("test");
		},
		navigationTo: function() {
			$('#message').hide();
			this.navigationSly.slideTo(0);
		},
		render: function() {
			this.$el.html(messageTemplate);
		}
	});

	return MessageView;
});