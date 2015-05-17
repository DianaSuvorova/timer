var Link = Router.Link;

var navbar = React.createClass({
  //When profile is needed <div className = 'profile' ><div>Sign In</div><div>Register</div></div>

  render: function () {

    return (
      <div id = 'navbar' className = {this.props.className} >
        <Link to='timer'>Timer</Link>
        <Link to='routines'>Daily Routines</Link>
      </div>
    );
  }
});

module.exports =  navbar;
