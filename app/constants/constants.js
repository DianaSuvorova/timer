var keyMirror = require('key-mirror');

var constants = keyMirror({

  //USER
  API_SET_USER_SUCCESS: null,
  API_RESET_USER_SUCCESS: null,
  API_SET_USER_REGISTER_ERROR: null,
  API_SET_USER_SIGNIN_ERROR: null,

  
  //routines
  UPDATE_CURRENT_ROUTINE_DATA: null,
  API_LOAD_ROUTINE_DATA_SUCCESS: null,

  //tasks
  API_GET_TASKS_SUCCESS: null,
  API_CREATE_TASK_SUCCESS: null

});

module.exports = constants;