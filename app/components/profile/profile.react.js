var profile = React.createClass({
  getInitialState: function () {
    return {signIn: false, register: false};
  },

  toggleSignIn: function () {
    this.setState({signIn: !this.state.signIn});
  },

  toggleRegister: function () {
    this.setState({register: !this.state.register});
  },

  register: function (e) {
    e.preventDefault();
    var username = $('#register').find('input.username').val();
    var password = $('#register').find('input.password').val();

    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    var onSuccess = function (user) {console.log('User "' + username + '" successfully created!');};
    var onError = function (error) {console.warn("Error: " + error.code + " " + error.message);};

    user.signUp().then(onSuccess, onError);
  },

  render: function () {
    signInClass = ClassNames({'expanded': this.state.signIn });
    registerClass = ClassNames({'expanded': this.state.register });

    return (
      <div id = 'profile'>
        <div className = {signInClass}>
          <span onClick = {this.toggleSignIn}> Sign In </span>
        </div>
        <div className = {registerClass}>
          <span onClick = {this.toggleRegister}>Register</span>
          <form id = 'register'>
            <input className = 'username' type = 'text' placeholder = 'Username'/>
            <input className = 'password' type = 'password' placeholder = 'Password'/>
            <input type = 'password' placeholder = 'Confirm password'/>
            <button onClick = {this.register} >REGISTER</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports =  profile;
