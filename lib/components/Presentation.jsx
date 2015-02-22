'use strict';

import React from 'react';
import rHelper from '../d3-helpers/rect';
import { Link, State } from 'react-router';
import d3 from 'd3';
import Components from '../components/Components.jsx';
import Slides from '../slide-store';

window.d3 = d3; // for console convenience

export default React.createClass({
  mixins: [State],

  getSlide() {
    return Slides.getContent(this.getParams().slideId).toJS();
  },
  componentDidMount() {
    var svg = d3.select(this.refs.svg.getDOMNode());
    svg.selectAll("rect")
       .data(this.getSlide())
       .enter()
       .append("rect")
       .attr(rHelper.attrsForAppend)
  },
  componentWillReceiveProps() {
    var sel = d3.select(this.refs.svg.getDOMNode())
                .selectAll("rect")
                .data(this.getSlide());

    sel.exit().transition().style('opacity', 0.001).remove();

    sel.enter()
       .append("rect")
       .attr(rHelper.attrsForAppend)

    sel.transition()
       .attr(rHelper.attrsForTransition)
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
        <div>
          <Link className="slide-link" to="presentation" params={{slideId: prevId}}>Previous</Link>
          <Link className="slide-link" to="presentation" params={{slideId: nextId}}>Next</Link>
        </div>
        <div>
          <svg ref="svg" width="800" height="600"></svg>
        </div>
      </div>
    );
  }
});
