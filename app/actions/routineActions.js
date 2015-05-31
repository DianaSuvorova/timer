var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var Api = require('../api/api');

var routineActions = {
    loadData: function(index) {
      Api.getRoutineDataAtIndex(index);
    },

    updateCurrentRoutineData: function (index) {
      Dispatcher.dispatch({
        actionType: Constants.UPDATE_CURRENT_ROUTINE_DATA,
        index: index
      });
    }
};

module.exports = routineActions;
