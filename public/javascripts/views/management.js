define(['text!templates/modelUpload.html','text!templates/photoUpload.html','text!templates/listAll.html','text!templates/management.html', 'VeView'],
  function(modelUploadTemplate,photoUploadTemplate,listAllTemplate,managementTemplate, VeView) {
  var registerView = VeView.extend({
    el: $('#manage'),
    events: {
      "change #fileUpload" : "fileListener",
      "click .close" : "closeWindow",
      "click .modelNav" : "modelUpload",
      "click .photoNav" : "photoUpload",
      "click .allNav" : "listAll"
    },
    handleImageUpload: function (event) {
      var files = event.target.files;
      var myImage = files[0];
      this.sendFile(myImage);
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
    sendFile: function(image){
      var uri = '/saveImage';
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', uri, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var imageName = xhr.responseText;
          console.log(imageName);
          //do what you want with the image name returned
          //e.g update the interface
        }
      };
      fd.append('myFile', image);
      // fd.append('myFile2s', image);
      xhr.send(fd);
    },
    fileListener: function(event){
      this.handleImageUpload(event);
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