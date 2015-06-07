var Api = require('../api/api');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _user = {};
var _registerError = null;
var _signInError = null;

function setUser (user) {
    _user = user;
    _registerError = null;
    _signInError = null;
}

function setRegisterError (error) {
    _registerError = error;
}

function setSignInError (error) {
    _signInError = error;
}

var userStore = assign({}, EventEmitter.prototype, {
  getUserSate: function () {
    return {
      username: _user.username,
      email: _user.email,
      registerError: _registerError,
      signInError: _signInError
    };
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

Dispatcher.register( function (action) {
  switch(action.actionType) {
    case Constants.API_SET_USER_SUCCESS:
      setUser(action.user);
      userStore.emitChange();
      break;
    case Constants.API_SET_USER_REGISTER_ERROR:
      setRegisterError(action.error);
      userStore.emitChange();
      break;
    case Constants.API_SET_USER_SIGNIN_ERROR:
      setSignInError(action.error);
      userStore.emitChange();
      break;
    case Constants.API_RESET_USER_SUCCESS:
      setUser({username: null, email: null});
      userStore.emitChange();
      break;

  }
});


module.exports = userStore;