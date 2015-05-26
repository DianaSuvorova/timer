var Api = require('../api/api');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _routine = {index:0};

function update (routine) {
  _routine = {
    content: (routine.attributes) ? routine.attributes.Content : null,
    author: (routine.attributes) ? routine.attributes.Author : null,
    index: routine.index
  };
}

var RoutineStore = assign({}, EventEmitter.prototype, {

  getRoutine: function () {
    return  _routine;
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
    case Constants.API_GET_ROUTINE_DATA:
      update(action.routine);
      RoutineStore.emitChange();
      break;
  }
});

module.exports = RoutineStore;