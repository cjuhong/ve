define(['text!templates/assign.html','text!templates/desk_generate.html','text!templates/booth_generate.html','text!templates/booth.html', 'VeView','ve/ve'],
  function(assignTemplate,deskGenerateTemplate,boothGenerateTemplate,boothTemplate, VeView,VE) {
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
      "click .assign" : "assign",
      //"click .updateBooth" : "updateBooth",
      // "click .allNav" : "listAll",
      "click button.booth" : "generate",
      "click button.desk" : "generateDesk"
    },
    updateBooth: function(event){
      console.log(event);
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
    assign: function(event){
      $('.navList').html(assignTemplate);
      var boothData = "";
      var that = this;
      $.get('/fethcAllBooths', function(data) {

        // data.forEach(function(value) {

        //   boothData = "<p>" + boothData + value.userName + "</p>";
        // });

        $.get('/accounts/findAllExhibitors', function(exhibitors) {
          that.$('.navList').html(_.template(assignTemplate, { data: data , exhibitors: exhibitors}));

          $('.updateBooth').click(function(){
            // $(this).attr("disabled","disabled");
            var brothers = $(this).siblings();
            var selected_exhibitor = $(brothers[0]).val();
            var exhibitor_number = $(brothers[2]).val();
            var id = $(brothers[3]).val();
            // console.log(selected_exhibitor);
            // console.log(exhibitor_number);
            // console.log(id);

           $.post('/booth/updateBooth/'+id,{'exhibitor':selected_exhibitor,'number':exhibitor_number}).done(function(data){ });
          });
        });
        
      });

    },
    booth_generate : function(event) {
      $('.navList').html(boothGenerateTemplate);
    },
    generate: function(event){
      var num = this.$('#booth_num').val();
      var xp = [];
      num = num.valueOf();
      for(var i=0;i<num;i++){
        // var boxxx = new Physijs.BoxMesh( new THREE.CubeGeometry( 200, 10, 200 ), new THREE.MeshBasicMaterial({ color: 0x8ff888 }) );
        // boxxx.position.x = -1750;
        // // boxxx.position.y = 200;
        // boxxx.position.z = 1500;
        // VE.scene.add(boxxx);
        var x = -2080 + i*435;
        xp[i]=x;
        // VE.booths(x);
      }
      $.post('/generateBooth/'+num,{'xp':xp},function(){
        console.log(data);
      });

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