'use strict';

var React = require('react'),
Factory = require('../factory'),
Components = require('../components/Components.jsx'),
{ State, Link } = require('react-router'),
Slides = require('../slide-store'),
nodeId = 1,
Slide = React.createClass({
  mixins: [State],

  getSlide() {
    return Slides.getContent(this.getParams().slideId);
  },

  updateSlide(content) {
    return Slides.setContent(this.getParams().slideId, content);
  },

  getInitialState() {
    return {nodes: this.getSlide(), handleClick: this.addRectangle};
  },

  componentWillReceiveProps(props) {
    this.setState({nodes: this.getSlide()});
  },

  addRectangle(evt) {
    var svgRect = this.refs.svg
                           .getDOMNode()
                           .getBoundingClientRect();
    nodeId = nodeId + 1;

    var newRect = Factory.create('Rectangle', {
      key: "rect-" + nodeId,
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
      var nodeProps = node.get('props').merge({handleClick: this.state.handleClick});
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

module.exports = Slide;
