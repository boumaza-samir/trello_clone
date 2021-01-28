const users = require('./users/users.service.js');
const boards = require('./boards/boards.service.js');
const activities = require('./activities/activities.service.js');
const tasks = require('./tasks/tasks.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(boards);
  app.configure(activities);
  app.configure(tasks);
};
