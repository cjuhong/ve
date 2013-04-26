define(['VeView','text!templates/message.html'], function(VeView,messageTemplate) {
  var MessageView = VeView.extend({
    el: $('#message'),
    
    render: function() {
      this.$el.html(messageTemplate);
    }
  });

  return MessageView;
});