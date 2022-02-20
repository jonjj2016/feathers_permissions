// messages-model.js - A mongoose model
const mongoose = require('mongoose')
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'messages';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    message: { type: String, required: true },
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    bucket:{
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref:'buckets'
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
