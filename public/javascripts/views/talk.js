define(['VeView', 'text!templates/talk.html'],

function(VeView, talkTemplate) {
	var talkView = VeView.extend({
		tagName: 'div',
		initialize: function(options) {
			// this.elementClass = options.sessionClass;
			this.socketEvents = options.socketEvents;
			this.$el.addClass(options.sessionClass);
			this.socketEvents.bind('stopTalking',this.stopTalking,this);
			this.socketEvents.bind(options.sessionClass,this.startTalking,this);
			this.socketEvents.bind('socket:chat:in:' + options.sessionClass,this.receiveChat,this);
			// className : 'chatting',
			// this.navigationSly = options.navigationSly;
			// this.contactsCollection = options.contactsCollection;
			// this.collection.on('reset', this.renderCollection, this);
		},
		events: {
			'submit form': 'sendChat'
		},
		sendChat: function() {
			var that = this;
			var chatText = this.$el.find('input[name=chat]').val();
			if (chatText && /[^\s]+/.test(chatText)) {
				var chatLine = 'Me: ' + chatText;
				var logChat = this.$el.find('.chat_log').append($('<li>' + chatLine + '</li>'));
				var logHeight = logChat.prop('scrollHeight');
				logChat.scrollTop(logHeight);
				// this.socketEvents.trigger('sessionStart',{sessionId: that.model.get('accountId')});
				// console.log(that.model);
				this.socketEvents.trigger('socket:chat', {
					to: that.model.get('accountId'),
					text: chatText
				});
			}
			return false;
		},
		receiveChat: function(data) {
			console.log('starting receieve');
			var chatLine = this.model.get('name') + ': ' + data.text;
			this.$el.find('.chat_log').append($('<li>' + chatLine + '</li>'));
		},
		render: function() {
			this.$el.html(talkTemplate).appendTo('#talk');
			// this.$el.html(talkTemplate).fadeIn();
		},
		stopTalking : function() {
			this.$el.removeClass('chatting');
		},
		startTalking: function() {
			this.$el.addClass('chatting');
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
	return talkView;
	//add over flow scroller bar over the window of interacts
	// add contacts control center
});