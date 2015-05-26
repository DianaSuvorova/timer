var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var Api = require('../api/api');

var routineActions = {
    getNext: function(index) {
      Api.getRoutineDataAtIndex(index + 1);
  },

    getPrevious: function(index) {
      Api.getRoutineDataAtIndex(index - 1);
  },

};

module.exports = routineActions;