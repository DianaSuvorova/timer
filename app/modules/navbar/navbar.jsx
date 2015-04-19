Timer.Views.Navbar = React.createClass({
  //When profile is needed <div className = 'profile' ><div>Sign In</div><div>Register</div></div>

  render: function () {
    var navbarClass = classNames ({
      'navbar': true,
      'dark' : !this.props.currentPageTimer,
      'light' : this.props.currentPageTimer 
    }); 

    return (
      <div className = {navbarClass} >
        <div className = 'timer' onClick = {function () {this.props.setTimerCurrentPage(true); }.bind(this)}> Timer </div>
        <div className = 'routines' onClick = {function () {this.props.setTimerCurrentPage(false); }.bind(this)}> Daily Routines </div>
      </div>
    );
  }
});
