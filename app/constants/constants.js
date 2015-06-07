var keyMirror = require('key-mirror');

var constants = keyMirror({
  API_LOAD_ROUTINE_DATA_SUCCESS: null,

  //USER
  API_SET_USER_SUCCESS: null,
  API_RESET_USER_SUCCESS: null,
  API_SET_USER_REGISTER_ERROR: null,
  API_SET_USER_SIGNIN_ERROR: null,

  UPDATE_CURRENT_ROUTINE_DATA: null

});

module.exports = constants;