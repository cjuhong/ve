define(['text!templates/desk_generate.html','text!templates/booth_generate.html','text!templates/booth.html', 'VeView','ve/ve'],
  function(deskGenerateTemplate,boothGenerateTemplate,boothTemplate, VeView,VE) {
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
      // "change .uploadDataModel" : "modelListener",
      // "change .uploadDataPhoto" : "photoListener",
      "click .close" : "closeWindow",
      // "click .modelNav" : "modelUpload",
      "click .booth_generate" : "booth_generate",
      "click .desk_generate" : "desk_generate",
      // "click .allNav" : "listAll",
      "click button.booth" : "generate",
      "click button.desk" : "generateDesk"
    },
    generateDesk: function(event){
       var num = this.$('#desk_num').val();
       num = num.valueOf();

       for(var i=0;i<num;i++){
        VE.desk(-2000 + i*210);
       }
    },
    desk_generate: function(event){
      $('.navList').html(deskGenerateTemplate);
    },
    booth_generate : function(event) {
      $('.navList').html(boothGenerateTemplate);
    },
    generate: function(event){
      var num = this.$('#booth_num').val();
      num = num.valueOf();
      for(var i=0;i<num;i++){
        // var boxxx = new Physijs.BoxMesh( new THREE.CubeGeometry( 200, 10, 200 ), new THREE.MeshBasicMaterial({ color: 0x8ff888 }) );
        // boxxx.position.x = -1750;
        // // boxxx.position.y = 200;
        // boxxx.position.z = 1500;
        // VE.scene.add(boxxx);
        VE.booths(-2080 + i*420);
      }

      // // console.log(VE);
      // var boxxx = new Physijs.BoxMesh( new THREE.CubeGeometry( 200, 10, 200 ), new THREE.MeshBasicMaterial({ color: 0x8ff888 }) );
      // boxxx.position.x = -1750;
      // // boxxx.position.y = 200;
      // boxxx.position.z = 1500;
      // VE.scene.add(boxxx);
    },
    closeWindow: function(){
      // $('#manage').remove();
      $('#boothDiv').fadeOut();
      console.log("closing");
    },
    render: function() {
      $(this.el).html(boothTemplate).fadeIn();
    }
  });
  return boothView;
});