var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var assign = require('object-assign');

var Api = {
    getRoutineDataAtIndex: function(index) {
        var Routines = Parse.Object.extend('Routines');
        var Query = new Parse.Query(Routines);
        var onSuccess = function (routine) {
          Dispatcher.dispatch({
            actionType: Constants.API_GET_ROUTINE_DATA,
            routine: assign(routine || {}, {index: index})
          });
        };
        var onError = function (error) {
          console.log(error);
        };
        Query.skip(index).first().then(onSuccess, onError);
    }
};

module.exports = Api;