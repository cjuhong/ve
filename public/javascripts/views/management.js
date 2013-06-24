define(['text!templates/modelUpload.html','text!templates/photoUpload.html','text!templates/listAll.html','text!templates/management.html', 'VeView'],
  function(modelUploadTemplate,photoUploadTemplate,listAllTemplate,managementTemplate, VeView) {
  var registerView = VeView.extend({
    el: $('#manage'),
    events: {
      "change .uploadDataModel" : "modelListener",
      "change .uploadDataPhoto" : "photoListener",
      "click .close" : "closeWindow",
      "click .modelNav" : "modelUpload",
      "click .photoNav" : "photoUpload",
      "click .allNav" : "listAll"
    },
    handleImageUpload: function (event) {
      var files = event.target.files;
      var target = $(event.target);
      var myImage = files[0];
      this.sendFile(myImage,target);
    },
    modelUpload : function(event) {
      $('.navList').html(modelUploadTemplate);
    },
    photoUpload : function(event) {
      $('.navList').html(photoUploadTemplate);
    },
    listAll : function(event) {
      $('.navList').html(listAllTemplate);
    },
    sendFile: function(image,target){
      var uri = '/data';
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', uri, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var imageName = xhr.responseText;
          console.log(imageName);
          $(target).next().html("upload successfully");
          //do what you want with the image name returned
          //e.g update the interface
        }else{
          $(target).next().html("upload failed");
        }
      };
      fd.append('myFile', image);
      // fd.append('myFile2s', image);
      xhr.send(fd);
    },
    modelListener: function(event){
      // this.handleImageUpload(event);
      var files = event.target.files;
      var target = $(event.target);
      var datafile = files[0];
      var uri = '/data';
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', uri, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var dataName = xhr.responseText;
          // console.log(imageName);
          $(target).next().html("upload successfully");
          //do what you want with the image name returned
          //e.g update the interface
        }else{
          $(target).next().html("upload failed");
        }
      };
      fd.append('myFile', datafile);
      fd.append('dataType', "model");
      // fd.append('myFile2s', image);
      xhr.send(fd);
    },
    photoListener: function(event){
      // this.handleImageUpload(event);
      var files = event.target.files;
      var target = $(event.target);
      var datafile = files[0];
      var uri = '/data';
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', uri, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var dataName = xhr.responseText;
          // console.log(imageName);
          $(target).next().html("upload successfully");
          //do what you want with the image name returned
          //e.g update the interface
        }else{
          $(target).next().html("upload failed");
        }
      };
      fd.append('myFile', datafile);
      fd.append('dataType', "photo");
      // fd.append('myFile2s', image);
      xhr.send(fd);
    },
    closeWindow: function(){
      $('#manage').fadeOut();
      console.log("closing");
    },
    render: function() {
      $(this.el).html(managementTemplate).fadeIn();
    }
  });
  return registerView;
});