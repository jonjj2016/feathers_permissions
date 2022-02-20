// buckets-model.js - A mongoose model
const mongoose = require('mongoose')
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'buckets';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String, required: true },
    users:[
      {
        type:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'users'
        }
      }
    ],
    permissions: [{
      role: {
        type: String,
        enum:['owner','admin','maintainer','watcher']
      }, 
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
      }
    }],
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
