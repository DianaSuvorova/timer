Timer.Views.Content = React.createClass({
  render: function () {
    var contentClass = classNames({
      'dark': !this.props.currentPageTimer,
      'light': this.props.currentPageTimer
    })

    var countDown = <Timer.Views.CountDown/>
    var routines = <Timer.Views.Routines/>
    var content =  (this.props.currentPageTimer) ? countDown : routines;
    return <div id = 'content' className = {contentClass}>{content}</div>;
  }
});
