var CountDown = require('./../countdown/countdown.react');
var Routines = require('./../routines/routines.react');

var content  = React.createClass({
  render: function () {
    var contentClass = classNames({
      'dark': !this.props.currentPageTimer,
      'light': this.props.currentPageTimer
    })

    var countDown = <CountDown/>
    var routines = <Routines/>
    var content =  (this.props.currentPageTimer) ? countDown : routines;
    return <div id = 'content' className = {contentClass}>{content}</div>;
  }
});

module.exports =  content;
