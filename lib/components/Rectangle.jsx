'use strict';

var React = require('react');

var Rectangle = React.createClass({
  getDefaultProps() {
    return {
      fill: "none",
      stroke: "black",
      strokeWidth: "3",
      width:"200",
      height:"200"
    }
  },

  render() {
    return <rect {...this.props} />
  }

});

module.exports = Rectangle;
