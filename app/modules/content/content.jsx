Timer.Views.Content = React.createClass({
  render: function () {
    var countDown = <Timer.Views.CountDown/>
    return <div className = 'content'> {countDown} </div>;
  }
});
