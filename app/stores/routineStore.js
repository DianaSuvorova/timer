var Api = require('../api/api');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _routines = [];
var _currentRoutine = {};

function add (routine) {
  if (! _routines[routine.index])
  _routines[routine.index] = {
    content: (routine.attributes) ? routine.attributes.Content : null,
    author: (routine.attributes) ? routine.attributes.Author : null,
    index: routine.index
  };
}

function setCurrentRoutine (index) {
  _currentRoutine = _routines[index];
}

var RoutineStore = assign({}, EventEmitter.prototype, {

  getCurrentRoutine: function () {
    return _currentRoutine;
  },

  getAtIndex: function (index) {
    return _routines[index];
  },

  getAll: function () {
    return _routines;
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
    case Constants.API_LOAD_ROUTINE_DATA_SUCCESS:
      add(action.routine);
      setCurrentRoutine(action.routine.index);
      RoutineStore.emitChange();
      break;

    case Constants.UPDATE_CURRENT_ROUTINE_DATA:
      setCurrentRoutine(action.index);
      RoutineStore.emitChange();
      break;
  }
});

module.exports = RoutineStore;