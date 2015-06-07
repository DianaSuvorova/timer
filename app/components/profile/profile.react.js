var React = require('react');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');
var assign = require('object-assign');

function getUserState () {
  var userSate = UserStore.getUserSate();
  return  assign(
      userSate,
      {registerDialogOpen: (userSate.registerError) ? true : false,
      signInDialogOpen: (userSate.signInError) ? true : false}
  );
}

var profile = React.createClass({

  getInitialState: function () {
    return {
      username: null,
      signInDialogOpen: false,
      registerDialogOpen: false,
      registerError: null,
      signInError: null
    };
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
    UserActions.getCurrentUser();
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  render: function () {
    signInClass = ClassNames({'sign-in': true, 'expanded': this.state.signInDialogOpen });
    registerClass = ClassNames({'register': true, 'expanded': this.state.registerDialogOpen });
    registerValidationClass = ClassNames({'error': true, 'active': this.state.registerError });
    signInValidationClass = ClassNames({'error': true, 'active': this.state.signInError });

    return (
      <div id = 'profile'>
        <div className = {signInClass}>
          <span onClick = {this.state.username ? null : this._toggleSignIn}>{this.state.username? 'Hi ' + this.state.username + '!': 'Sign In'}</span>
          <form id = 'sign-in'>
            <input className = 'username' type = 'text' placeholder = 'Username' onChange = {this._onChangeSignInForm}/>
            <input className = 'password' type = 'password' placeholder = 'Password' onChange = {this._onChangeSignInForm}/>
            <div className = {signInValidationClass} >{this.state.signInError}</div>
            <button onClick = {this._signIn} >SIGN IN</button>
          </form>

        </div>
        <div className = {registerClass}>
          <span onClick = {this.state.username ? this._signOut : this._toggleRegister}>{this.state.username? 'Sign Out' : 'Register'}</span>
          <form id = 'register'>
            <input className = 'username' type = 'text' placeholder = 'Username' onChange = {this._onChangeRegisterForm}/>
            <input className = 'email' type = 'text' placeholder = 'Email' onChange = {this._onChangeRegisterForm}/>
            <input className = 'password' type = 'password' placeholder = 'Password' onChange = {this._onChangeRegisterForm}/>
            <input className = 'confirm-password' type = 'password' placeholder = 'Confirm password' onChange = {this._onChangeRegisterForm}/>
            <div className = {registerValidationClass} >{this.state.registerError}</div>
            <button onClick = {this._register} >REGISTER</button>
          </form>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getUserState());
  },

  _toggleSignIn: function () {
    this.setState({registerDialogOpen: false, signInDialogOpen: !this.state.signInDialogOpen});
  },

  _toggleRegister: function () {
    this.setState({signInDialogOpen: false, registerDialogOpen: !this.state.registerDialogOpen});
  },

  _register: function (e) {
    e.preventDefault();
    var username = $('#register').find('input.username').val();
    var email = $('#register').find('input.email').val();
    var password = $('#register').find('input.password').val();
    var confirmPassword = $('#register').find('input.confirm-password').val();
    if (!username) this.setState({registerError: 'please provide username'});
    else if (!email) this.setState({registerError: 'please provide email address'});
    else if ((password !== confirmPassword) || !password) this.setState({registerError: 'passwords do not match or empty'});
    else UserActions.register(username, email, password);
  },

  _onChangeRegisterForm: function (e) {
    this.setState({registerError: null});
  },

  _signIn: function (e) {
    e.preventDefault();
    var username = $('#sign-in').find('input.username').val();
    var password = $('#sign-in').find('input.password').val();
    UserActions.signIn(username, password);
  },

  _onChangeSignInForm: function (e) {
    this.setState({signInError: null});
  },


  _signOut: function (e) {
    e.preventDefault();
    UserActions.signOut();
  }

});

module.exports =  profile;
