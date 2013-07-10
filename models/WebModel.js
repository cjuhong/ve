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
    dataType: {
      type: String
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
  var uploadModel = function(user_id, texture_id, model_id, data_type,title) {
    // var shaSum = crypto.createHash('sha256');
    // shaSum.update(password);
    // console.log('Registering ' + email);
    var model = new Model({
      userId: user_id,
      textureId: texture_id,
      modelId: model_id,
      dataType: data_type,
      name: title
    });
    model.save(uploadCallback);
    console.log('Save command was sent');
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
    console.log('Save command was sent');
  };
  var uploadCallback = function(err) {
    if (err) {
      return console.log(err);
    };
    return console.log('Upload was created');
  };

  var findAll = function(user_id, callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    Model.find({userId:user_id}, function(err, doc) {
      callback(doc);
    });
  };
  var fethcAllBooths = function(callback) {
    // var searchRegex = new RegExp(searchStr, 'i');
    Booth.find({}, function(err, doc) {
      callback(doc);
    });
  };

  return {
    uploadModel: uploadModel,
    findAll:findAll,
    generateBooth: generateBooth,
    fethcAllBooths: fethcAllBooths
  };
};