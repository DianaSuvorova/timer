Timer.Views.CountDown = React.createClass({
  getInitialState: function () {
    return {countDown: 134};
  },

  formatCountDown: function (countDown) {
    var sec = countDown % 60;
    var min = Math.floor(countDown / 60);
    var hr = Math.floor(countDown / 3600);
    return [hr, min, sec]
  }, 

  everySecond: function () {
    if (this.state.countDown > 0) {
      this.setState({countDown: this.state.countDown-1});
      setTimeout(this.everySecond, 1000);
    }
  },

  componentDidMount: function () {
    this.everySecond();
  },
  
  render: function () {
    var formattedTime = this.formatCountDown(this.state.countDown);
    return <div>  {formattedTime[0]} : {formattedTime[1]} : {formattedTime[2]} </div>;
  }
});