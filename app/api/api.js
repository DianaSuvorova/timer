var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var assign = require('object-assign');

var Api = {
    getRoutineDataAtIndex: function(index) {
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
    }
};

module.exports = Api;