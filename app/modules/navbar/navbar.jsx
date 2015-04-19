Timer.Views.Navbar = React.createClass({
  //When profile is needed <div className = 'profile' ><div>Sign In</div><div>Register</div></div>

  render: function () {
    var navbarClass = classNames ({
      'dark' : !this.props.currentPageTimer,
      'light' : this.props.currentPageTimer 
    }); 

    return (
      <div id = 'navbar' className = {navbarClass} >
        <div className = 'timer' onClick = {function () {this.props.setTimerCurrentPage(true); }.bind(this)}> Timer </div>
        <div className = 'routines' onClick = {function () {this.props.setTimerCurrentPage(false); }.bind(this)}> Daily Routines </div>
      </div>
    );
  }
});
