'use strict';

import React from 'react';

export default React.createClass({
  handleClick(e) {
    e.stopPropagation();
    this[this.props.clickAction](e);
  },
  select() {
  },
  render() {
    return <rect {...this.props} onClick={this.handleClick} />
  },

});
