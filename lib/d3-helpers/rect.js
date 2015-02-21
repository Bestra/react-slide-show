module.exports = {
  attrsForAppend: {
    x: (d => d.props.x),
    y: (d => d.props.y),
    width: (d => d.props.width),
    height: (d => d.props.height),
    fill: (d => d.props.fill),
    stroke: (d => d.props.stroke),
    key: (d => d.props.key),
    "stroke-width": (d => d.props.strokeWidth)
  },
  attrsForTransition: {
    x: (d => d.props.x),
    y: (d => d.props.y),
    width: (d => d.props.width),
    height: (d => d.props.height),
    fill: (d => d.props.fill),
    stroke: (d => d.props.stroke),
    "stroke-width": (d => d.props.strokeWidth)
  }
};
