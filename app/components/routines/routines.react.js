var RoutineActions = require('../../actions/routineActions');
var RoutineStore = require('../../stores/routineStore');
var assign = require('object-assign');

function getRoutineState () {
  return  RoutineStore.getCurrentRoutine();
}

function getRoutineAtIndex (index) {
  if (index < 0) index = RoutineStore.getAll().length - 1;
  if (RoutineStore.getAtIndex(index)) RoutineActions.updateCurrentRoutineData(index);
  else RoutineActions.loadData(index);
}

var routines = React.createClass({

  getInitialState: function () {
    return {Content: 'loading...'};
  },

  componentDidMount: function () {
    RoutineStore.addChangeListener(this._onChange);
    getRoutineAtIndex(0);
  },

  componentWillUnmount: function () {
    RoutineStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div id = 'routines'>
        <div className = 'navigation left' onClick = {this._onClickLeft}>
          <i className="fa fa-long-arrow-left"></i>
        </div>
        <div className= 'content'>
          <div className = 'routine'>{this.state.content}</div>
          <div className = 'author'>{this.state.author}</div>
        </div>
        <div className = 'navigation right' onClick = {this._onClickRight}>
          <i className="fa fa-long-arrow-right"></i>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getRoutineState());
  },

  _onClickLeft: function () {
    getRoutineAtIndex(this.state.index - 1);
  },

  _onClickRight: function () {
    getRoutineAtIndex(this.state.index + 1);        
  }

});

module.exports =  routines;
