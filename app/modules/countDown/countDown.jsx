Timer.Views.CountDown = React.createClass({
  //TODO : request animation frame for countdown?

  getInitialState: function () {
    return {countDown: 134, count: false};
  },

  formatCountDown: function (countDown) {
    var sec = countDown % 60;
    var min = Math.floor(countDown / 60);
    var hr = Math.floor(countDown / 3600);
    return [hr, min, sec]
  }, 

  zeroSpan: function (value) {
    if (value < 10) return (<span className = 'zero'>0</span>) ; 
    else return null;
  }, 

  everySecond: function (count) {
    if (this.state.countDown > 0 && (this.state.count || count)) {
      this.setState({countDown: this.state.countDown-1});
      setTimeout(this.everySecond, 1000);
    }
  },

  onClickPause: function () {
    this.setState({count: false});
  },

  onClickStart: function () {
    this.setState({count: true});
    this.everySecond(true);
  },

  render: function () {
    var pauseClass = classNames({
      'pause': true,
      'active': this.state.count
    });

    var startClass = classNames({
      'start': true,
      'active': !this.state.count
    });

    var formattedTime = this.formatCountDown(this.state.countDown);
    return (
      <div className = 'countDown'>
        
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
              <div>+</div>
              <div>-</div>
            </div>
          </div>
          
          <div className = 'semicolon'>:</div>
          
          <div className = 'digit'>
            <div className = 'min'> 
            {this.zeroSpan(formattedTime[1])}
             <span>{formattedTime[1]}</span>
            </div>
            <div className = 'tools'>
              <div>+</div>
              <div>-</div>
            </div>
          </div> 
          
          <div className = 'semicolon'>:</div> 
          
          <div className = 'digit'>
            <div className = 'sec'>
              {this.zeroSpan(formattedTime[2])}   
              <span>{formattedTime[2]}</span>
            </div>
            <div className = 'tools'>
              <div>+</div>
              <div>-</div>
            </div>
          </div> 
        
        </div>

      <div className = 'tools'>
        <div className = {pauseClass} onClick = {this.onClickPause}>Pause<i className="fa fa-long-arrow-right"></i></div>
        <div className = {startClass} onClick = {this.onClickStart}>Start<i className="fa fa-long-arrow-right"></i></div>  
      </div>
      
      </div>
    );
  }
});
