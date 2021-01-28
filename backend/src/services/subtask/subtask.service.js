// Initializes the `subtask` service on path `/subtask`
const { Subtask } = require('./subtask.class');
const createModel = require('../../models/subtask.model');
const hooks = require('./subtask.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/subtask', new Subtask(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subtask');

  service.hooks(hooks);
};
