define(['VeView','text!templates/navigation.html'], function(VeView,navigationTemplate) {
  var NavigationView = VeView.extend({
    el: $('#navigation'),
    
    render: function() {
      this.$el.html(navigationTemplate);
    }
  });

  return NavigationView;
});