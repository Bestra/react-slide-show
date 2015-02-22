'use strict';

import Factory from '../factory';
import React from 'react';
import Components from '../components/Components.jsx';
import { State, Link } from 'react-router';
import Slides from '../slide-store';

var idCount = 1;

export default React.createClass({
  mixins: [State],

  getSlide() {
    return Slides.getContent(this.getParams().slideId);
  },

  updateSlide(content) {
    return Slides.setContent(this.getParams().slideId, content);
  },

  getInitialState() {
    return {nodes: this.getSlide(),
            handleClick: this.addRectangle,
            clickAction: "select",
            selectedItem: null};
  },

  componentWillReceiveProps(props) {
    this.setState({nodes: this.getSlide()});
  },

  addRectangle(evt) {
    var svgRect = this.refs.svg
                           .getDOMNode()
                           .getBoundingClientRect();
    idCount = idCount + 1;

    var newRect = Factory.create('Rectangle', {
      nodeId: "rect-" + idCount,
      x: evt.pageX - svgRect.left,
      y: evt.pageY - svgRect.top,
    });

    var newContent = this.updateSlide(this.getSlide().push(newRect));

    this.setState({nodes: newContent});
  },

  setKey(evt) {
    debugger;
  },

  setActiveFn(fnName) {
    return (e => {
      this.setState({activeFn: fnName, handleClick: this[fnName]});
    })
  },

  multiBoxChange(event) {
    this.setState({inputVal: event.target.value});
  },

  render() {
    var slideId = parseInt(this.getParams().slideId),
    nextId = slideId + 1,
    prevId = slideId - 1;

    var childNodes = this.state.nodes.map(node => {
      var nodeProps = node.get('props').merge({clickAction: this.state.clickAction,
                                               key: node.getIn(['props', 'nodeId'])});
      return React.createElement(ComponentRegistry[node.get('factoryName')],
                                 nodeProps.toJS(),
                                 node.get('children').toJS());
    }).toArray();

    var inputPrompt = {addRectangle: "Click to make a rect",
                       setKey: "Click to set a key"}[this.state.activeFn]
                       || "MultiBox";

    return (
      <div>
      This is the Edit view
      <br/>
      <Link to="presentation" params={{slideId: slideId}}>See Presentation </Link>
      <div>
        <Link className="slide-link" to="slide" params={{slideId: prevId}}>Previous</Link>
        <Link className="slide-link" to="slide" params={{slideId: nextId}}>Next</Link>
        <button onClick={this.setActiveFn("addRectangle")}>Add Rectangle</button>
        <button onClick={this.setActiveFn("setKey")}>Set Key</button>
        <button onClick={this.setActiveFn(null)}>Select</button>
        <input value={this.state.inputVal} onChange={this.multiBoxChange} placeholder={inputPrompt}/>

      </div>
      <div>
        <svg ref="svg" onClick={this.state.handleClick} width="800" height="600">{childNodes}</svg>
      </div>
      </div>
    );
  }
});
