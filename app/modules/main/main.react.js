var Navbar = require('./../navbar/navbar.react');
var Content = require('./../content/content.react');

var main = React.createClass({
  getInitialState: function () {
    return {currentPageTimer: true};
  },

  setTimerCurrentPage: function (state) {
    this.setState({currentPageTimer: state});
  },

  render: function () {
    var navbar = <Navbar setTimerCurrentPage = {this.setTimerCurrentPage} currentPageTimer = {this.state.currentPageTimer} />
    var content = <Content currentPageTimer = {this.state.currentPageTimer}/>
    return (<div>{navbar}{content}</div>)
  }
});

module.exports =  main;
