'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

let foo =  React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});
export default foo
