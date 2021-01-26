// boards-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'boards';
  const mongooseClient = app.get('mongooseClient');
  const mongoose = require('mongoose');
  const schema = new mongooseClient.Schema({
    name: { type: String },
    img: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

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