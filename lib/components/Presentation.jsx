'use strict';

import React from 'react';
import rHelper from '../d3-helpers/rect';
let {attrsForAppend, attrsForTransition} = rHelper;
import { Link, State } from 'react-router';
import d3 from 'd3';
import Components from '../components/Components.jsx';
import Slides from '../slide-store';

window.d3 = d3; // for console convenience

export default React.createClass({
  mixins: [State],

  getSlideItems(type) {
    let slides = Slides.getContent(this.getParams().slideNo)
    .filter(s => s.get('elementName') == type)
    return Object.values(slides.toJS());
  },
  componentDidMount() {
    var svg = d3.select(this.refs.svg.getDOMNode());
    svg.selectAll("rect")
       .data(this.getSlideItems('rect'))
       .enter()
       .append("rect")
       .attr(attrsForAppend);
    svg.selectAll("text")
       .data(this.getSlideItems('text'))
       .enter()
       .append("text")
       .attr({x: (d => d.props.x),
             y: (d => d.props.y)})
       .text(d => d.props.text);
  },
  componentWillReceiveProps() {
    var rects = d3.select(this.refs.svg.getDOMNode())
                .selectAll("rect")
                .data(this.getSlideItems('rect'));

    rects.exit().transition().style('opacity', 0.001).remove();

    rects.enter()
       .append("rect")
       .attr(attrsForAppend)

    rects.transition()
       .attr(attrsForTransition)

    var texts = d3.select(this.refs.svg.getDOMNode())
                .selectAll("text")
                .data(this.getSlideItems('text'));

    texts.exit().transition().style('opacity', 0.001).remove();

    texts.enter()
      .append("text")
      .attr('x', d => d.props.x)
      .attr('y', d => d.props.y)
      .text(d => d.props.text);

    texts.transition()
      .attr('x', d => d.props.x)
      .attr('y', d => d.props.y);
  },
  render() {
    var slideNo = parseInt(this.getParams().slideNo),
    nextId = slideNo + 1,
    prevId = slideNo - 1;
    return (
      <div>
        This is the presentation view
        <br/>
        <Link to="slide" params={{slideNo: slideNo}}>Edit</Link>
        <div>
          <Link className="slide-link" to="presentation" params={{slideNo: prevId}}>Previous</Link>
          <Link className="slide-link" to="presentation" params={{slideNo: nextId}}>Next</Link>
        </div>
        <div>
          <svg ref="svg" width="800" height="600"></svg>
        </div>
      </div>
    );
  }
});
