define(['text!templates/booth_generate.html''text!templates/booth.html', 'VeView'],
  function(boothGenerateTemplate,boothTemplate, VeView) {
  var boothView = VeView.extend({
    el: $('#boothDiv'),
    // initialize: function(options) {
    //   // VE.init();
    //   this.$('form').submit(function(){
    //     // console.log("init");
    //     this.preventDefault();
    //   });
    // },
    events: {
      "change .uploadDataModel" : "modelListener",
      "change .uploadDataPhoto" : "photoListener",
      "click .close" : "closeWindow",
      "click .modelNav" : "modelUpload",
      "click .photoNav" : "photoUpload",
      "click .allNav" : "listAll",
      "click button" : "upload"
    },

    closeWindow: function(){
      // $('#manage').remove();
      $('#boothDiv').fadeOut();
      console.log("closing");
    },
    render: function() {
      $(this.el).html(boothGenerateTemplate).fadeIn();
    }
  });
  return boothView;
});