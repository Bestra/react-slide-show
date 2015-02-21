'use strict';

var React = require('react'),
Components = require('../components/Components.jsx'),
Slides = require('../slide-store'),
d3 = require('d3'),
{ Link, State } = require('react-router'),

Presentation = React.createClass({
  mixins: [State],

  getSlides() {
    return Slides.getContent(this.getParams().slideId);
  },
  componentDidMount() {
    var svg = d3.select(this.refs.svg.getDOMNode());
    svg.selectAll("rect")
       .data(this.getSlides())
       .enter()
       .append("rect")
       .attr("x", d => d.props.x)
       .attr("y", d => d.props.y)
       .attr("width", d => d.props.width)
       .attr("height", d => d.props.height)
       .attr("fill", d => d.props.fill)
       .attr("stroke", d => d.props.stroke)
       .attr("key", d => d.props.key)
       .attr("stroke-width", d => d.props.strokeWidth)
  },
  componentWillReceiveProps() {
    var sel = d3.select(this.refs.svg.getDOMNode())
                .selectAll("rect")
                .data(this.getSlides());
    sel.exit().transition().style('opacity', 0.001).remove();
    sel.enter()
       .append("rect")
       .attr("x", d => d.props.x)
       .attr("y", d => d.props.y)
       .attr("width", d => d.props.width)
       .attr("height", d => d.props.height)
       .attr("fill", d => d.props.fill)
       .attr("stroke", d => d.props.stroke)
       .attr("key", d => d.props.key)
       .attr("stroke-width", d => d.props.strokeWidth);
    sel.transition()
       .attr("x", d => d.props.x)
       .attr("y", d => d.props.y)
       .attr("fill", d => d.props.fill)
       .attr("stroke", d => d.props.stroke)
  },
  render() {
    var slideId = parseInt(this.getParams().slideId),
    nextId = slideId + 1,
    prevId = slideId - 1;
    return (
      <div>
        This is the presentation view
        <br/>
        <Link to="slide" params={{slideId: slideId}}>Edit</Link>
        <Link to="presentation" params={{slideId: nextId}}>Next</Link>
        <Link to="presentation" params={{slideId: prevId}}>Previous</Link>
        <div>
          <svg ref="svg" width="800" height="600"></svg>
        </div>
      </div>
    );
  }
});

window.d3 = d3; // for console convenience
module.exports = Presentation;
