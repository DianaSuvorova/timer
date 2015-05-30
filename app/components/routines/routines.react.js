var RoutineActions = require('../../actions/routineActions');
var RoutineStore = require('../../stores/routineStore');
var assign = require('object-assign');

function getRoutineState () {
  return  RoutineStore.getCurrentRoutine();
}

var routines = React.createClass({

  getInitialState: function () {
    return {content: 'loading...'};
  },

  componentDidMount: function () {
    RoutineStore.addChangeListener(this._onChange);
    RoutineActions.loadData(0);
  },

  componentWillUnmount: function () {
    RoutineStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div id = 'routines'>
        <div className = 'navigation left' onClick = {this._onClickLeft}>
          <div><i className="fa fa-long-arrow-left"></i></div>
        </div>
        <div className= 'content'>
          <div> {this.state.content} </div>
        </div>
        <div className = 'navigation right' onClick = {this._onClickRight}>
          <div><i className="fa fa-long-arrow-right"></i></div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getRoutineState());
  },

  _onClickLeft: function () {
    if (RoutineStore.getAtIndex(this.state.index - 1)) RoutineActions.updateCurrentRoutineData(this.state.index - 1);
    else RoutineActions.loadData(this.state.index - 1);    
  },

  _onClickRight: function () {
    if (RoutineStore.getAtIndex(this.state.index + 1)) RoutineActions.updateCurrentRoutineData(this.state.index + 1);
    else RoutineActions.loadData(this.state.index + 1 );    
    
  }

});

module.exports =  routines;
