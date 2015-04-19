Timer.Views.Routines = React.createClass({
  render: function () {

    var content = ' I write my stories in the morning my diariy at night. There is interruption all the time but I can quickly deal with an interruption and then know that its Tuesday, I have product meetings and I need to focus on product stuff.';

    return (
      <div id = 'routines'>  
        <div className = 'navigation left'><div><i className="fa fa-long-arrow-left"></i></div></div>
        <div className= 'content'>
          <div>{content}</div>
        </div>
        <div className = 'navigation right'><div><i className="fa fa-long-arrow-right"></i></div></div>
      </div>
    );
  }
});
