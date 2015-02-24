import Immutable from 'immutable';
import Reflux from 'reflux';
import actions from './actions';

export default Reflux.createStore({
  slides: new Immutable.List().set(0, new Immutable.Map()),
  selectedItemIds: new Immutable.Set(),

  init() {
    this.listenTo(actions.itemSelected, this.onItemSelected);
    this.listenTo(actions.itemUpdated, this.onItemUpdated);
    this.listenTo(actions.itemCreated, this.onItemCreated);
  },

  onItemSelected(itemId) {
    this.selectedItemIds = new Immutable.Set([itemId]);
    this.trigger('selection');
  },

  onItemUpdated(slideNo, itemId, newProps) {
    this.slides = this.slides.updateIn([slideNo - 1, itemId], item => item.mergeDeep({props: newProps.props}));

    this.trigger('update');
  },

  onItemCreated(slideNo, item) {
    this.slides = this.slides.setIn([slideNo - 1, item.getIn(['props', 'itemId'])], item);

    this.trigger('update');
  },

  getContent(slideNo) {
    var idx = slideNo - 1;
    if (!this.slides.has(idx)) {
      this.slides = this.slides.set(idx, new Immutable.Map());
    }

    return this.slides.get(idx);
  },

  setContent(slideNo, content) {
    var idx = slideNo - 1;
    this.slides = this.slides.set(idx, content);

    return this.slides.get(idx);
  },

  getSelection() {
    return this.selectedItemIds;
  },

});
