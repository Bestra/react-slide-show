import Immutable from 'immutable';
import Reflux from 'reflux';
import actions from './actions';

var slides = new Immutable.List();

export default Reflux.createStore({
  slides: slides,
  selectedItems: [],

  init() {
    this.listenTo(actions.itemSelected, this.onItemSelected);
    this.listenTo(actions.itemUpdated, this.onItemUpdated);
  },

  onItemSelected(itemId) {
    this.selectedItems = [itemId];
    this.trigger('selection');
  },

  onItemUpdated(slideNo, itemId, newProps) {
    var slideIndex = parseInt(slideNo) - 1,
    slideContent = this.slides.get(slideIndex),
    itemIndex = slideContent.findIndex(s => s.getIn(['props', 'itemId']) == itemId),
    item = slideContent.get(itemIndex);
    this.slides = this.slides.setIn([slideIndex, itemIndex], item.mergeDeep({props: newProps.props}));

    this.trigger('update');
  },

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
  },

  getSelection() {
    return this.selectedItems;
  },
});
