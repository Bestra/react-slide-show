'use strict';

import React from 'react/addons';
import Actions from '../actions';
let { itemUpdated, itemSelected } = Actions;

export default React.createClass({
  getInitialState() {
    return {moving: false};
  },

  moveStart(e) {
    e.preventDefault();
    e.stopPropagation();
    var { pageX, pageY } = e,
    { memo } = this.props;
    this.setState({moving: true, pageX, pageY, memo});
  },
  move(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.moving) return;
    // new position = change in mouse position + old position
    var dX = (e.pageX - this.state.pageX),
    dY = (e.pageY - this.state.pageY);
    this.props.onMove(dX, dY, this.state.memo);
  },
  moveEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({moving: false});
    this.props.onMoveEnd();
  },
  render() {
    var mouseHandlers = {onMouseDown: this.moveStart,
                         onMouseMove: this.move,
                         onMouseUp: this.moveEnd}

    return  <circle cx={this.props.x}
                    cy={this.props.y}
                    r="20"
                    {...mouseHandlers}/>;
  }

});
