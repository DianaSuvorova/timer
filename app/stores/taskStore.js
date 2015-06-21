var assign = require('object-assign');
var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _tasks = [];
var _currentTask = {};

function setTasks (tasks) {
  _tasks = tasks;
}

function addTask (task) {
  _currentTask = task;
  _tasks.unshift(task);
}

var taskStore = assign({}, EventEmitter.prototype, {

  getTasks: function () {
    return _tasks.map(function (task) {return task.attributes; });
  },

  getCurrentTask: function () {
    return _currentTask;
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
    case Constants.API_GET_TASKS_SUCCESS:
        setTasks(action.tasks);
        taskStore.emitChange();
        break;
    case Constants.API_CREATE_TASK_SUCCESS:
        addTask(action.task);
        taskStore.emitChange();
        break;
  }
});

module.exports = taskStore;