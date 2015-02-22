'use strict';

import React from 'react';
import { Route, Redirect } from 'react-router';
import { Presentation, App, Slide } from './components/Components.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="slide" path=":slideNo" handler={Slide} />
    <Route name="presentation" path="present/:slideNo" handler={Presentation} />
    <Redirect from="/" to="slide" params={{slideNo: 1}} />
  </Route>
);
