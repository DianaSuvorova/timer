var Parse = require('parse').Parse;
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var assign = require('object-assign');

Parse.initialize("SLnd1zLozFTpIesfrsWOfUM9SL5UnUdQyuI4KiJz", "JRj9hIHiTayn0y8DUyxANwD9hf7G1P2l45xQIo0t");

var Api = {

  getRoutineDataAtIndex: function (index) {
    var Routines = Parse.Object.extend('Routines');
    var Query = new Parse.Query(Routines);
    var onSuccess = function (response) {
      Dispatcher.dispatch({
        actionType: Constants.API_LOAD_ROUTINE_DATA_SUCCESS,
        routine: response ? assign(response.attributes, {index: index}) : null
      });
    };
    var onError = function (xhr) {
      console.log(xhr);
    };
    Query.skip(index).first().then(onSuccess, onError);
  },

  getCurrentUser: function () {
    var user = Parse.User.current();
    if (user) Dispatcher.dispatch({
      actionType: Constants.API_SET_USER_SUCCESS,
      user: user.attributes,
      userObject: user
    });
  },

  register: function (username, email, password) {
    var user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    var onSuccess = function (user) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_SUCCESS,
        user: user.attributes,
        userObject: user
      });
    };
    var onError = function (xhr) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_REGISTER_ERROR,
        error: xhr.message
      });
    };

    user.signUp().then(onSuccess, onError);
  },

  signIn: function (username, password) {
    var onSuccess = function (user) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_SUCCESS,
        user: user.attributes,
        userObject: user
      });
    };
    var onError = function (xhr) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_SIGNIN_ERROR,
        error: xhr.message
      });
    };
    Parse.User.logIn(username, password).then(onSuccess, onError);
  },

  signOut: function () {
    Parse.User.logOut();
    Dispatcher.dispatch({
      actionType: Constants.API_RESET_USER_SUCCESS,
    });
  },

  createTask: function (content, startTime, userObject) {
    var Task = Parse.Object.extend('Task');
    var task = new Task();

    var onSuccess = function (task) {
      Dispatcher.dispatch({
        actionType: Constants.API_CREATE_TASK_SUCCESS,
        task: task
      });
    };
    var onError = function (task, error) {
      console.log('createTask error', task, error);
    };

    task.save({content: content, startTime: startTime, user: userObject}).then(onSuccess, onError);
  },

  updateTask: function (taskObject, attributes) {

    var onSuccess = function (task) {
      console.log(task);
    };
    var onError = function (task, error) {
      console.log('updateTask error', task, error);
    };

    taskObject.save(attributes).then(onSuccess, onError);
  },

  getTasksForUser: function (userObject) {
    var Task = Parse.Object.extend('Task');
    var Query = new Parse.Query(Task);
    Query.equalTo("user", userObject).descending('createdAt');
    var onSuccess = function (tasks) {
      Dispatcher.dispatch({
        actionType: Constants.API_GET_TASKS_SUCCESS,
        tasks: tasks
      });
    };
    var onError = function (tasks, error) {
      console.log('error', tasks, error);
    };

    Query.find().then(onSuccess, onError);
  }

};

module.exports = Api;