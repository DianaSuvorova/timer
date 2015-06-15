var React = require('react');
var FlowActions = require('../../actions/flowActions');
var TaskStore = require('../../stores/taskStore');
var UserStore = require('../../stores/userStore');


function getFlowState () {
  return {tasks: TaskStore.getTasks()};
}

var flow = React.createClass({

  getInitialState: function () {
    return {
      tasks : [],
      task: null,
      taskPlannedDuration: null,
      taskActualDuration: null
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

    var tasks = this.state.tasks.map(function (task, i) {
      return <span key = {'task_content_'+ i }>{task.content}</span>
    });

    return (
      <div id = 'flow'>
        <div className = 'task'>
          <div className = 'label'> What are you doing? </div>
          <div className = 'task-input'>
            <form id = 'input-task'>
              <input placeholder = 'What can you do with your time that is important?'/>
              <div className = 'tools'>
                <div className = {pauseClass} onClick = {this._onClickPause}>Pause<i className="fa fa-long-arrow-right"></i></div>
                <div className = {startClass} onClick = {this._onClickStart}>Start<i className="fa fa-long-arrow-right"></i></div>  
              </div>
            </form>
          </div>
        </div>
        <div className = 'history'>
          <div className = 'list'> {numList} </div>
          <div className = 'tasks'> {tasks} </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getFlowState());
  },

  _onClickStart: function () {
    var task = $('#input-task').find('input').val();
    FlowActions.createTask(task, UserStore.getUserObject());
    this.props.onClickStart();
  },

  _onClickPause: function () {
    if (this.state.taskPlannedDuration) this.setState({taskActualDuration: this.state.taskPlannedDuration - this.props.getCountDownTime()})
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
