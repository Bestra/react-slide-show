var Factory = require('./factory'),
Immutable = require('immutable'),
slides = new Immutable.List();

var store = {
  slides: slides,

  getContent(slideNo) {
    var index = parseInt(slideNo) - 1;
    if (!this.slides.has(index)) {
      this.slides = this.slides.set(index, new Immutable.List());
    }

    return this.slides.get(index);
  },

  setContent(slideNo, content) {
    var index = parseInt(slideNo) - 1;
    this.slides = this.slides.set(index, content);

    return this.slides.get(index);
  }

};
module.exports = store;
