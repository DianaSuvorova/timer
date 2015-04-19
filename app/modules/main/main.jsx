Timer.Views.Main = React.createClass({
  render: function () {
    var navbar = <Timer.Views.Navbar/>
    var content = <Timer.Views.Content/>
    var footer = <Timer.Views.Footer/>
    return (<div>{navbar}{content}</div>)
  }
});
