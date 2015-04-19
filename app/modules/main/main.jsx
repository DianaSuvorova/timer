Timer.Views.Main = React.createClass({
  getInitialState: function () {
    return {currentPageTimer: true};
  },

  setTimerCurrentPage: function (state) {
    this.setState({currentPageTimer: state});
  },

  render: function () {
    var navbar = <Timer.Views.Navbar setTimerCurrentPage = {this.setTimerCurrentPage} currentPageTimer = {this.state.currentPageTimer} />
    var content = <Timer.Views.Content currentPageTimer = {this.state.currentPageTimer}/>
    return (<div>{navbar}{content}</div>)
  }
});
