var Immutable = require('immutable');

var defaults = Immutable.fromJS({
  Rectangle: {factoryName: "Rectangle",
    elementName: "rect",
    props: {
      x: 25,
      y: 25,
      width: 100,
      height: 100,
      fill: "white",
      stroke: "black",
      strokeWidth: "3"
    },
    children: []
  }
});

module.exports = {
  create(name, props) {
    return defaults.get(name).mergeDeep({props: props});
  }
};
