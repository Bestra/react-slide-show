'use strict';

import React from 'react';
import { itemSelected, itemUpdated } from '../actions';

export default React.createClass({
  getInitialState() {
    return {moving: false};
  },
  select() {
    itemSelected(this.props.itemId);
  },
  moveStart(e) {
    e.preventDefault();
    e.stopPropagation();
    var initialPosition = this.getDOMNode().getBoundingClientRect(),
    { pageX, pageY } = e,
    { x, y } = this.props;
    this.setState({moving: true, x, y, pageX, pageY});
  },
  move(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.moving) return;
    var newX = (e.pageX - this.state.pageX) + this.state.x,
    newY = (e.pageY - this.state.pageY) + this.state.y;

    itemUpdated(this.props.slideNo, this.props.itemId, {props: {x: newX, y: newY}});
  },
  moveEnd(e) {
    this.setState({moving: false});
    e.preventDefault();
    e.stopPropagation();
  },
  render() {
    var handlerMap = {select: {onClick: this.select},
                      move: {onMouseDown: this.moveStart,
                             onMouseMove: this.move,
                             onMouseUp: this.moveEnd}
    }[this.props.clickAction];
    var isSelected = this.props.selection.indexOf(this.props.itemId) > -1;
    var dash = isSelected ? "5, 5" : null ;
    return <rect {...this.props} {...handlerMap} strokeDasharray={dash}/>
  },

});
