define(['text!templates/register.html','VeView'], function(registerTemplate,VeView) {
  var registerView = VeView.extend({
    el: $('#interacts'),
    events: {
      "submit form": "register"
    },
    register: function() {
      $.post('/register', {
        firstName: $('input[name=firstName]').val(),
        lastName: $('input[name=lastName]').val(),
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val(),
        role: $('select[name=role]').val()
      }, function(data) {
        console.log(data);
      });
      return false;
    },
    render: function() {
      $(this.el).html(registerTemplate).fadeIn();
    }
  });
  return registerView;
});