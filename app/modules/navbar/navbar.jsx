Timer.Views.Navbar = React.createClass({
  render: function () {
    return (
      <div className = 'navbar'>
        <div className = 'timer'> Timer </div>
        <div className = 'routines'> Daily Routines </div>
        <div className = 'profile' >
          <div>Sign In</div>
          <div>Register</div>
        </div>
      </div>
    );
  }
});
