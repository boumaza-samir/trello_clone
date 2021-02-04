const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const {  slowdown, removeDanglingChildren } = require('../../utils/');



const subTasksResolver = {
  joins: {
    subtasks: () => async (tasks, context) => {
      const { method, params: {
        $eager
      } } = context;
      if(method === 'get' || $eager) {
        tasks.subtask = (await context.app.services['subtask'].find({
          query: { taskId: tasks._id },
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
    find: [fastJoin(subTasksResolver, query)],
    get: [fastJoin(subTasksResolver, query)],
    create: [],
    update: [],
    patch: [],
    remove: [removeDanglingChildren('subtask', 'taskId')]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }};
