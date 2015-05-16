React = require('react');
jQuery = require('jquery');
classNames = require('classnames');

var TimerApp = require('./../main/main.react');

(function($) {
  $(document).ready(function () {
    React.render(<TimerApp/>, document.body);
  });
})(jQuery);
