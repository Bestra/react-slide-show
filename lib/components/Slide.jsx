'use strict';

import Factory from '../factory';
import React from 'react';
import Components from '../components/Components.jsx';
import { State, Link } from 'react-router';
import slideStore from '../slide-store';
import { itemCreated, itemSelected } from '../actions';

var idCount = 1;

export default React.createClass({
  mixins: [State],

  getSlide() {
    return slideStore.getContent(parseInt(this.getParams().slideNo));
  },

  getInitialState() {
    return {nodes: this.getSlide(),
            selection: [],
            handleClick: this.addRectangle,
            clickAction: "select"};
  },

  componentWillReceiveProps(props) {
    this.setState({nodes: this.getSlide()});
  },

  componentDidMount() {
    this.unsubscribe = slideStore.listen(this.onSlideUpdate);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  onSlideUpdate() {
    this.setState({nodes: this.getSlide(), selection: slideStore.getSelection()});
  },

  svgCoordinates(evt) {
    var svgRect = this.refs.svg
                           .getDOMNode()
                           .getBoundingClientRect();

     return {x: evt.pageX - svgRect.left,
             y: evt.pageY - svgRect.top};

  },

  addRectangle(evt) {
    idCount = idCount + 1;
    var slideNo = parseInt(this.getParams().slideNo),
    { x, y } = this.svgCoordinates(evt),
    newRect = Factory.create('Rectangle', {
      itemId: "rect-" + idCount,
      x,
      y,
      slideNo
    });

    itemCreated(slideNo, newRect);
  },

  addText(evt) {
    idCount = idCount + 1;
    var slideNo = parseInt(this.getParams().slideNo),
    { x, y } = this.svgCoordinates(evt),
    newText = Factory.create('Text', {
      itemId: "text-" + idCount,
      x,
      y,
      slideNo
    });

    itemCreated(slideNo, newText);
  },

  setKey(evt) {
  },

  select() {
    itemSelected([null]);
  },

  setActiveFn(fnName) {
    return (e => {
      this.setState({clickAction: fnName, handleClick: this[fnName]});
    })
  },

  multiBoxChange(event) {
    this.setState({inputVal: event.target.value});
  },

  render() {
    var slideNo = parseInt(this.getParams().slideNo),
    nextId = slideNo + 1,
    prevId = slideNo - 1,

    { clickAction, selection } = this.state,
    childNodes = this.state.nodes.map((node) => {
      var itemId = node.getIn(['props', 'itemId']),
      isSelected = selection.has(itemId),
      nodeProps = node.get('props').merge({clickAction: clickAction,
                                           key: itemId,
                                           isSelected: isSelected});
      return React.createElement(ComponentRegistry[node.get('factoryName')],
                                 nodeProps.toObject(),
                                 node.get('children').toJS());
    }).toArray();

    var inputPrompt = {
      addRectangle: "Click to make a rect",
      setKey: "Click to set a key",
      select: "Pick something",
      addText: "Click to add text"
    }[this.state.clickAction] || "MultiBox";

    return (
      <div>
        This is the Edit view
        <br/>
        <Link to="presentation" params={{slideNo: slideNo}}>See Presentation </Link>
        <div>
          <Link className="slide-link" to="slide" params={{slideNo: prevId}}>Previous</Link>
          <Link className="slide-link" to="slide" params={{slideNo: nextId}}>Next</Link>
          <button onClick={this.setActiveFn("addRectangle")}>Add Rectangle</button>
          <button onClick={this.setActiveFn("addText")}>Add Text</button>
          <button onClick={this.setActiveFn("editText")}>Edit Text</button>
          <button onClick={this.setActiveFn("move")}>Move</button>
          <button onClick={this.setActiveFn("select")}>Select</button>
          <input value={this.state.inputVal} onChange={this.state.onMultiBoxChange} placeholder={inputPrompt}/>
        </div>
        <div>
          <svg ref="svg" onClick={this.state.handleClick} width="800" height="600">{childNodes}</svg>
        </div>
      </div>
    );
  }
});
