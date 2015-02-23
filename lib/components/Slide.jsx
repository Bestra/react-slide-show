'use strict';

import Factory from '../factory';
import React from 'react';
import Components from '../components/Components.jsx';
import { State, Link } from 'react-router';
import slideStore from '../slide-store';

var idCount = 1;

export default React.createClass({
  mixins: [State],

  getSlide() {
    return slideStore.getContent(this.getParams().slideNo);
  },

  updateSlide(content) {
    return slideStore.setContent(this.getParams().slideNo, content);
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

  addRectangle(evt) {
    var svgRect = this.refs.svg
                           .getDOMNode()
                           .getBoundingClientRect();
    idCount = idCount + 1;
    var slideNo = parseInt(this.getParams().slideNo);
    var newRect = Factory.create('Rectangle', {
        slideNo: slideNo,
        itemId: "rect-" + idCount,
        x: evt.pageX - svgRect.left,
        y: evt.pageY - svgRect.top
      });

    var newContent = this.updateSlide(this.getSlide().push(newRect));

    this.setState({nodes: newContent});
  },

  setKey(evt) {
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
    prevId = slideNo - 1;

    var { clickAction, selection } = this.state;
    var childNodes = this.state.nodes.map((node) => {
      var nodeProps = node.get('props').merge({clickAction: clickAction,
                                               key: node.getIn(['props', 'itemId']),
                                               selection: selection});
      return React.createElement(ComponentRegistry[node.get('factoryName')],
                                 nodeProps.toJS(),
                                 node.get('children').toJS());
    }).toArray();

    var inputPrompt = {addRectangle: "Click to make a rect",
                       setKey: "Click to set a key"}[this.state.clickAction]
                       || "MultiBox";

    return (
      <div>
        This is the Edit view
        <br/>
        <Link to="presentation" params={{slideNo: slideNo}}>See Presentation </Link>
        <div>
          <Link className="slide-link" to="slide" params={{slideNo: prevId}}>Previous</Link>
          <Link className="slide-link" to="slide" params={{slideNo: nextId}}>Next</Link>
          <button onClick={this.setActiveFn("addRectangle")}>Add Rectangle</button>
          <button onClick={this.setActiveFn("move")}>Move</button>
          <button onClick={this.setActiveFn("select")}>Select</button>
          <input value={this.state.inputVal} onChange={this.multiBoxChange} placeholder={inputPrompt}/>
        </div>
        <div>
          <svg ref="svg" onClick={this.state.handleClick} width="800" height="600">{childNodes}</svg>
        </div>
      </div>
    );
  }
});
