
var footer = React.createClass({
  render: function () {
    var date = new Date();
    return <div>{'© Black Format. ' + date.getFullYear()} </div>;
  }
});

module.exports = footer;
