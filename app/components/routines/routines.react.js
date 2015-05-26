var RoutineActions = require('../../actions/routineActions');
var RoutineStore = require('../../stores/routineStore');
var assign = require('object-assign');

function getRoutineState() {
  return  RoutineStore.getRoutine();
}

var routines = React.createClass({

  getInitialState: function () {
    return getRoutineState();
  },

  componentDidMount: function () {
    RoutineStore.addChangeListener(this._onChange);
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
    RoutineActions.getPrevious(this.state.index);    
  },

  _onClickRight: function () {
    RoutineActions.getNext(this.state.index);    
  }

});

module.exports =  routines;
