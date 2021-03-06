var React = require('react');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');
var Flow = require('./../flow/flow.react');
var assign = require('object-assign');


function getCountDownState () {
  var userState = UserStore.getUserState();
  return { signedIn: (userState.username) ? true : false };
}

var countdown = React.createClass({
  //TODO : request animation frame for countdown?

  getInitialState: function () {
    return {
      signedIn: false,
      countDown: 134,
      count: false,
      changed: false
    };
  },

  getCountDownTime: function () {
    return this.state.countDown;
  },

  updateStopWatchState: function (state) {
    this.setState({count: state});
  },

  getStopWatchState: function () {
    return this.state.count;
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
    UserActions.getCurrentUser();
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  formatCountDown: function (countDown) {
    var hr = Math.floor(countDown / 3600);
    var min = Math.floor((countDown - (hr * 3600)) / 60);
    var sec = countDown % 60;
    return [hr, min, sec];
  },

  zeroSpan: function (value) {
    if (value < 10) return (<span className = 'zero'>0</span>) ; 
    else return null;
  }, 

  everySecond: function (count) {
    if (this.state.countDown > 0 && (count || this.state.count) && !this.state.changed) {
      this.setState({countDown: this.state.countDown-1});
      setTimeout(this.everySecond, 1000);
    }
  },

  addSecs: function (secs) {
    this.setState({changed: true});
    this.setState({countDown: Math.max(Math.min(this.state.countDown + secs, 359999), 0)}); //between 99:59:59 and 0;
    this.setState({changed: false});
  },

  onClickPause: function () {
    this.updateStopWatchState(false);
  },

  onClickStart: function () {
    this.updateStopWatchState(true);
    this.everySecond(true);
  },

  render: function () {
    var pauseClass = ClassNames({
      'pause': true,
      'active': this.state.count
    });

    var startClass = ClassNames({
      'start': true,
      'active': !this.state.count
    });

    var formattedTime = this.formatCountDown(this.state.countDown);

    var tools = (this.state.signedIn) ?
           <Flow getCountDownTime = {this.getCountDownTime} onClickPause = {this.onClickPause}  onClickStart = {this.onClickStart}  count = {this.state.count} />  :
          (  <div className = 'tools'>
                <div className = {pauseClass} onClick = {this.onClickPause}>Pause<i className="fa fa-long-arrow-right"></i></div>
                <div className = {startClass} onClick = {this.onClickStart}>Start<i className="fa fa-long-arrow-right"></i></div>  
              </div>
          );

    return (
      <div id = 'countDown'>
        <div className = 'watch'>
        
          <div className = 'header'>
            <div>Hours</div>
            <div>Minutes</div>
            <div>Seconds</div>
          </div>

          <div className = 'value'>
            
            <div className = 'digit'>
              <div className = 'hour'>
                {this.zeroSpan(formattedTime[0])}
                <span>{formattedTime[0]}</span>
              </div>
              <div className = 'tools'>
                <div onClick={function (){ this.addSecs(3600); }.bind(this)}>+</div>
                <div onClick={function (){ this.addSecs(-3600); }.bind(this)}>-</div>
              </div>
            </div>
            
            <div className = 'semicolon'>:</div>
            
            <div className = 'digit'>
              <div className = 'min'> 
              {this.zeroSpan(formattedTime[1])}
               <span>{formattedTime[1]}</span>
              </div>
              <div className = 'tools'>
                <div onClick={function (){ this.addSecs(60); }.bind(this)}>+</div>
                <div onClick={function (){ this.addSecs(-60); }.bind(this)}>-</div>
              </div>
            </div> 
            
            <div className = 'semicolon'>:</div> 
            
            <div className = 'digit'>
              <div className = 'sec'>
                {this.zeroSpan(formattedTime[2])}   
                <span>{formattedTime[2]}</span>
              </div>
              <div className = 'tools'>
                <div onClick={function (){ this.addSecs(1); }.bind(this)}>+</div>
                <div onClick={function (){ this.addSecs(-1); }.bind(this)}>-</div>
              </div>
            </div> 
          
          </div>        
        </div>
        {tools}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCountDownState());
  }

});


module.exports = countdown;
