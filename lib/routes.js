'use strict';

var React = require('react'),
  { Route, Redirect } = require('react-router'),
  { Presentation, App, Slide } = require('./components/Components.jsx');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="slide" path=":slideId" handler={Slide} />
    <Route name="presentation" path="present/:slideId" handler={Presentation} />
    <Redirect from="/" to="slide" params={{slideId: 1}} />
  </Route>
);

