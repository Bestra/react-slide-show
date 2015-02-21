'use strict';

window.React = require('react');
var Router = require('react-router'),
  routes = require('./routes');

/**
 * For the React Chrome addon
 */

/**
 * React render error callback
 * @param err
 * @returns {*}
 */
function onRenderError(err) {
  if (err) {
    return console.error(err);
  }
}

/**
 * Rendering the app to the site's body. Using react-router here.
 */
Router.run(routes, function(Handler) {
  React.render(
    <Handler/>,
    document.body,
    onRenderError
  );
});
