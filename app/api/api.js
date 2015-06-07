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
      user: user.attributes
    });
  },

  register: function (username, email, password) {
    var user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    var onSuccess = function (response) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_SUCCESS,
        user: response.attributes
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
    var onSuccess = function (response) {
      Dispatcher.dispatch({
        actionType: Constants.API_SET_USER_SUCCESS,
        user: response.attributes
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


};

module.exports = Api;