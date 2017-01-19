'use strict';

import React from 'react/addons';
import Actions from '../actions';
let { itemUpdated, itemSelected } = Actions;
import ResizeHandle from "./ResizeHandle.jsx";

export default React.createClass({
  getInitialState() {
    var { x, y, width, height } = this.props;
    return {moving: false, x, y, width, height};
  },
  select(e) {
    e.preventDefault();
    e.stopPropagation();
    itemSelected(this.props.itemId);
  },
  propsUpdated(newProps) {
    itemUpdated(this.props.slideNo, this.props.itemId, {props: newProps});
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
  onResize(dX, dY, memo) {
    this.setState({width: memo.width + dX,
                  height: memo.height + dY});
  },
  onResizeDone() {
    this.propsUpdated({width: this.state.width,
                       height: this.state.height});
  },
  render() {
    var handlerMap = {select: {onClick: this.select},
                      move: {onMouseDown: this.moveStart,
                             onMouseMove: this.move,
                             onMouseUp: this.moveEnd}
    }[this.props.clickAction];
    var dash = this.props.isSelected ? "5, 5" : null ;
    var { x, y, width, height } = this.state;
    var { fill, stroke, strokeWidth } = this.props;
    var c = <ResizeHandle x={x + width}
                          y={y + height}
                          memo={{width, height}}
                          onMove={this.onResize}
                          onMoveEnd={this.onResizeDone}/>;
    return(
      <g>
      <rect x={x}
            y={y}
            width={width}
            height={height}
            strokeDasharray={dash}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            {...handlerMap}/>
      {this.props.isSelected ? c : null}
      </g>
    );
  },

});
