'use strict';

import React from 'react/addons';
import { itemSelected, itemUpdated, itemTextEdited } from '../actions';

export default React.createClass({
  getInitialState() {
    var { x, y } = this.props;
    return {moving: false, x, y};
  },
  select() {
    itemSelected(this.props.itemId);
  },
  propsUpdated(newProps) {
    itemUpdated(this.props.slideNo, this.props.itemId, {props: newProps});
  },
  editText() {
    itemTextEdited(this.props.slideNo, this.props.itemId);
  },
  moveStart(e) {
    e.preventDefault();
    e.stopPropagation();
    var initialPosition = this.getDOMNode().getBoundingClientRect(),
    { pageX, pageY } = e;
    this.setState({moving: true, pageX, pageY});
  },
  move(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.moving) return;
    var newX = (e.pageX - this.state.pageX) + this.props.x,
    newY = (e.pageY - this.state.pageY) + this.props.y;

    this.setState({x: newX, y: newY});
  },
  moveEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({moving: false});
    this.propsUpdated({x: this.state.x,
                       y: this.state.y});
  },
  render() {
    var handlerMap = {select: {onClick: this.select},
                      move: {onMouseDown: this.moveStart,
                             onMouseMove: this.move,
                             onMouseUp: this.moveEnd},
                      editText: {onClick: this.editText}
    }[this.props.clickAction];
    var { x, y } = this.state;
    return(
      <text x={x} y={y} {...handlerMap}>
        {this.props.text}
      </text>
    );
  }
});
