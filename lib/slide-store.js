import Factory from './factory';
import Immutable from 'immutable';

var slides = new Immutable.List();

export default {
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
