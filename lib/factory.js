import Immutable from 'immutable';

var defaults = Immutable.fromJS({
  Rectangle: {factoryName: "Rectangle",
    elementName: "rect",
    slide: 1,
    props: {
      itemId: "rect-1",
      d3Key: null,
      x: 25,
      y: 25,
      width: 100,
      height: 100,
      fill: "white",
      stroke: "black",
      strokeWidth: "3"
    },
    children: []
  },
  Text: {factoryName: "Text",
    elementName: "text",
    slide: 1,
    props: {
      itemId: "text-1",
      d3Key: null,
      x: 25,
      y: 25,
      text: "Sample Text"
    },
    children: []
  }
});

export default {
  create(name, props) {
    return defaults.get(name).mergeDeep({props: props});
  }
};
