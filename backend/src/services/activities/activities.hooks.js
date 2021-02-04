const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const { slowdown, removeDanglingChildren } = require('../../utils/');



const tasksResolver = {
  joins: {
    tasks: () => async (activity, context) => {
      const { method, params: {
        $eager
      } } = context;
      if (method === 'get' || $eager) {
        activity.tasks = (await context.app.services['tasks'].find({
          query: { activityId: activity._id },
          $eager,
        }));
      }
    },
  }
};

const query = {
  tasks: true,
};

module.exports = {
  before: {
    all: [authenticate('jwt'), slowdown],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [fastJoin(tasksResolver, query)],
    get: [fastJoin(tasksResolver, query)],
    create: [],
    update: [],
    patch: [],
    remove: [removeDanglingChildren('tasks', 'activityId')]
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
};
