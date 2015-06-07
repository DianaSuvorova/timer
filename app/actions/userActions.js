var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var Api = require('../api/api');

var routineActions = {

  getCurrentUser: function () {
    Api.getCurrentUser();
  },

  register: function (username, email, password) {
    Api.register(username, email, password);
  },

  signIn: function (username, password) {
    Api.signIn(username, password);
  },

  signOut: function () {
    Api.signOut();
  }

};

module.exports = routineActions;
