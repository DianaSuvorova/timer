React = require('react');
jQuery = require('jquery'); //not used anywhere yet.
ClassNames = require('classnames');
Router = require('react-router');


var Navbar = require('./../navbar/navbar.react');
var CountDown = require('./../countdown/countdown.react');
var Routines = require('./../routines/routines.react');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var app = React.createClass({

  render: function () {

    var appClass= ClassNames({
      'dark': this.props.path === '/routines'
    });

    return (
      <div id = 'app' className = {appClass}>
        <Navbar className = {appClass} />
        <div className = 'content'><RouteHandler/></div>
      </div>
      )
  }
});

var routes =(
  <Route name = 'app' path = '/' handler = {app}>
    <Route name = 'timer' path = '/timer' handler = {CountDown}/>
    <Route name = 'routines' path = '/routines' handler = {Routines}/>
    <DefaultRoute handler = {CountDown}/>
    <Redirect from = '/'  to = '/timer' />
  </Route>
);


Router.run(routes, function (Handler, state) {
  React.render(<Handler path =  {state.path}/>, document.body);
});

module.exports =  app;