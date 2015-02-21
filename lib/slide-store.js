var slides = [];

id = 1;
slides.push(
  [{factoryName: "Rectangle",
    elementName: "rect",
    props: {
      key: id,
      x: 25,
      y: 25,
      width: 100,
      height: 100,
      fill: "none",
      stroke: "black",
      strokeWidth: "3"
    },
    children: []
}]);

var store = {
  slides: slides,

  getContent(slideNo) {
    var index = parseInt(slideNo) - 1;
    if (!this.slides[index]) {
      this.slides[index] = [];
    }

    return this.slides[index];
  }

};
module.exports = store;
