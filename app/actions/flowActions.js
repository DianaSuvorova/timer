var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var Api = require('../api/api');

var flowActions = {

  createTask: function (content, userObject) {
   Api.createTask(content, userObject);
  },

  getTasksForUser: function (userObject) {
    Api.getTasksForUser(userObject);
  },

};

module.exports = flowActions;
