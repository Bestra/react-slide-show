'use strict';

var React = require('react'),
Components = require('../components/Components.jsx'),
{ State, Link } = require('react-router'),
Slides = require('../slide-store'),
nodeId = 1,
Slide = React.createClass({
  mixins: [State],

  processNodes(defs) {
    return defs.map(node => {
      return React.createElement(ComponentRegistry[node.factoryName],
                                 node.props,
                                 node.children);
    });
  },

  getSlides() {
    return Slides.getContent(this.getParams().slideId);
  },

  getInitialState() {
    return {nodes: this.processNodes(this.getSlides())}
  },

  componentWillReceiveProps(props) {
    this.setState({nodes: this.processNodes(this.getSlides())});
  },

  handleClick(evt) {
    var svgRect = this.refs.svg.getDOMNode().getBoundingClientRect();
    nodeId = nodeId + 1;
    var slideNodes = this.getSlides();
    slideNodes.push(
      { factoryName: "Rectangle",
        elementName: "rect",
        props: {
          key: nodeId,
          x: evt.pageX - svgRect.left,
          y: evt.pageY - svgRect.top,
          width: 100,
          height: 100
        },
        children: []
    });

    this.setState({nodes: this.processNodes(slideNodes)});

  },
  render() {
    var slideId = parseInt(this.getParams().slideId),
    nextId = slideId + 1,
    prevId = slideId - 1;

    return (
      <div>
      This is the Edit view
      <br/>
      <Link to="presentation" params={{slideId: slideId}}>See Presentation </Link>
      <Link to="slide" params={{slideId: nextId}}>Next</Link>
      <Link to="slide" params={{slideId: prevId}}>Previous</Link>
      <div>
        <svg ref="svg" onClick={this.handleClick} width="800" height="600">{this.state.nodes}</svg>
      </div>
      </div>
    );
  }
});

module.exports = Slide;
