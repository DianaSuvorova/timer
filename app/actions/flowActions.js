var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var Api = require('../api/api');

var flowActions = {

  createTask: function (content, startTime, userObject) {
   Api.createTask(content, startTime, userObject);
  },

  getTasksForUser: function (userObject) {
    Api.getTasksForUser(userObject);
  },

  updateTask: function (taskObject, attributes) {
    Api.updateTask (taskObject, attributes);
  },

};

module.exports = flowActions;
