'use strict';

var React = require('react'),
  RouteHandler = require('react-router').RouteHandler,
  App;


App = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
