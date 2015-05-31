var Link = Router.Link;
var Profile = require('./../profile/profile.react');

var navbar = React.createClass({

  render: function () {

    return (
      <div id = 'navbar' className = {this.props.className} >
        <Link to='timer'>Timer</Link>
        <Link to='routines'>Daily Routines</Link>
        <Profile/>
      </div>
    );
  }
});

module.exports =  navbar;
