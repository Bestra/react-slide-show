'use strict';

var React = require('react');

var Rectangle = React.createClass({

  render() {
    return <rect {...this.props} onClick={this.props.handleClick} />
  },

});

module.exports = Rectangle;
