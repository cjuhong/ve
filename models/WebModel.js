module.exports = function(app, config, mongoose, gridfs) {
  var crypto = require('crypto');

  var schemaOptions = {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  };
  
  var PhotoSchema = new mongoose.Schema({
    photoId: {
      type: mongoose.Schema.ObjectId,
    },
    dataType: {
      type: String
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    x:{
      type: Number
    },
    y:{
      type: Number
    },
    z:{
      type: Number
    },
    name: {
      type: String
    }
  });


  var ModelSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    textureId: {
      type: mongoose.Schema.ObjectId,
    },
    modelId: {
      type: mongoose.Schema.ObjectId,
    },
    x:{
      type: Number
    },
    y:{
      type: Number
    },
    z:{
      type: Number
    },
    dataType: {
      type: String
    },
    xr:{
      type: Number
    },
    yr:{
      type: Number
    },
    zr:{
      type: Number
    },
    scale:{
      type: Number
    },
    name: {
      type: String
    }
  });

  var BoothSchema = new mongoose.Schema({

    x:{
      type: Number
    },
    y:{
      type: Number
    },
    z:{
      type: Number
    },
    booth_num:{
      type: Number
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    userName: {
      type: String
    }
  });

  var Model = mongoose.model('Model', ModelSchema);
  var Photo = mongoose.model('Photo', PhotoSchema);
  var Booth = mongoose.model('Booth', BoothSchema);
  var uploadModel = function(user_id, texture_id, model_id, data_type,title,bp) {
    // var shaSum = crypto.createHash('sha256');
    // shaSum.update(password);
    // console.log('Registering ' + email);
    var model = new Model({
      userId: user_id,
      textureId: texture_id,
      modelId: model_id,
      dataType: data_type,
      name: title,
      x:bp.x,
      y:bp.y,
      z:bp.z+400
    });
    model.save(uploadCallback);
    console.log('Save command was sent');
    return model;
  };


  var uploadPhoto = function(user_id, photo_id, data_type,title,bp) {
    // var shaSum = crypto.createHash('sha256');
    // shaSum.update(password);
    // console.log('Registering ' + email);
    var photo = new Photo({
      userId: user_id,
      photoId: photo_id,
      dataType: data_type,
      name: title,
      x:bp.x,
      y:bp.y,
      z:bp.z+400
    });
    photo.save(uploadCallback);
    console.log('Save command was sent');
    return photo;
  };

  var generateBooth = function(user_id,user_name,xp,yp,zp){

        var booth = new Booth({
          x: xp,
          y: yp,
          z: zp,
          userId: user_id,
          userName:user_name
        });
        booth.save();
        return booth;
    console.log('Save command was sent');
  };
  var uploadCallback = function(err) {
    if (err) {
      return console.log(err);
    };
    return console.log('Upload was created');
  };



  var findAll = function( callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    Model.find(function(err, doc) {
      if(err) return console.log(err);
      callback(doc);
    });
  };

    var findAllPhoto = function( callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    Photo.find(function(err, doc) {
      if(err) return console.log(err);
      callback(doc);
    });
  };

  // var findAll = function(user_id, callback) {
  //   // var searchRegex = new RegExp(searchStr, 'i');
  //   Model.find({userId:user_id}, function(err, doc) {
  //     if(err) return console.log(err);
  //     callback(doc);
  //   });
  // };
  var fethcAllBooths = function(callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    Booth.find({}, function(err, doc) {
      callback(doc);
    });
  };

  var findOneBooth = function(id,callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    // Booth.find({}, function(err, doc) {
    //   callback(doc);
    // });

    Booth.findOne({
      _id: id
    }, function(err, doc) {
      callback(doc);
    });
  };

  var findOneModel = function(id,callback) {

    Model.findOne({
      _id: id
    }, function(err, doc) {
      callback(doc);
    });
  };

  var findOnePhoto = function(id,callback) {

    Photo.findOne({
      _id: id
    }, function(err, doc) {
      callback(doc);
    });
  };

  return {
    uploadModel: uploadModel,
    findAll:findAll,
    findOnePhoto: findOnePhoto,
    generateBooth: generateBooth,
    fethcAllBooths: fethcAllBooths,
    findOneBooth: findOneBooth,
    uploadPhoto: uploadPhoto,
    findAllPhoto: findAllPhoto,
    findOneModel: findOneModel
  };
};