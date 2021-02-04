import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Subtask extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Subtask'

  // Define default properties here
  static instanceDefaults() {
    return {
      action: '',
      comment: '',
      completed: '',
      taskId: '',
    };
  }
}
const servicePath = 'subtask';
const servicePlugin = makeServicePlugin({
  Model: Subtask,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;
