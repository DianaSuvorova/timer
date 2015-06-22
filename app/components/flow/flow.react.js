var React = require('react');
var FlowActions = require('../../actions/flowActions');
var TaskStore = require('../../stores/taskStore');
var UserStore = require('../../stores/userStore');

var hoursDigMap = {
  0: 'Zero',
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
};

function formatTime (timestamp) {
  return timestamp.getHours() + '.' + timestamp.getMinutes();
}

function formatDuration (endTime, startTime) {
  var hours = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
  var mins = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  return [hoursDigMap[hours], mins];
}

function getFlowState () {
  return {tasks: TaskStore.getTasks()};
}

var flow = React.createClass({

  getInitialState: function () {
    return {
      tasks : []
    };
  },

  componentDidMount: function () {
    TaskStore.addChangeListener(this._onChange);
    this._getTasks();
  },

  componentWillUnmount: function () {
    TaskStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var pauseClass = ClassNames({
      'pause': true,
      'active': this.props.count
    });

    var startClass = ClassNames({
      'start': true,
      'active': !this.props.count
    });

    var numList = this.state.tasks.map(function (task, i) {
      return <span key = {'task_num_'+ i } >{i}</span>
    });

    var durationSpan = function (duration) {
      return (
        <span className = 'duration'>
        <span>{duration[0]}</span>
        <span>{duration[1]}</span>
      </span>);
    }; 

    var timeIntervalText = function (startTime, endTime) {
      if (!startTime) return '';
      else {
        return formatTime(startTime) + '  __  ' +  ((endTime) ? formatTime(endTime) : '' );
      }
    };

    var tasks = this.state.tasks.map(function (task, i) {
      return ( 
        <div key = {'task'+ i } className = 'row'>
           <span className = 'num' >{(i + 1) + '.'}</span>
           <span className = 'content' >{task.content}</span>
           <span className = 'interval'>{timeIntervalText(task.startTime, task.endTime)}</span>
            {(task.endTime && task.startTime) ? durationSpan(formatDuration(task.endTime, task.startTime)) : <span className = 'duration'></span> }
        </div>
      )
    });

    return (
      <div id = 'flow'>
        <div className = 'task'>
          <div className = 'label'> What are you doing? </div>
          <div className = 'task-input'>
            <form id = 'input-task'>
              <input placeholder = 'What can you do with your time that is important?'/>
              <div className = 'tools'>
                <div className = {pauseClass} onClick = {this._onClickPause}>
                  Stop<i className="fa fa-long-arrow-right"></i>
                </div>
                <div className = {startClass} onClick = {this._onClickStart}>Start<i className="fa fa-long-arrow-right"></i></div>  
              </div>
            </form>
          </div>
        </div>
        <div className = 'history'> { (this.state.tasks.length)? {tasks} : "Things you was spending your time on."}</div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getFlowState());
  },

  _onClickStart: function () {
    var content = $('#input-task').find('input').val();
    var startTime = new Date();
    FlowActions.createTask(content, startTime, UserStore.getUserObject());
    this.props.onClickStart();
  },

  _onClickPause: function () {
    $('#input-task').find('input').val('');
    var endTime = new Date();
    FlowActions.updateTask(TaskStore.getCurrentTask(), {endTime: endTime});
    this.props.onClickPause();
  },

  _getTasks: function () {
  if (!TaskStore.getTasks().length) {
    FlowActions.getTasksForUser(UserStore.getUserObject());
  }
  else {
    this.setState(getFlowState());
  }
}

});

module.exports =  flow;
