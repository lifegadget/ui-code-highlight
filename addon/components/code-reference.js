import Ember from 'ember';
import layout from '../templates/components/ui-code-highlight';
import UiCodeHighlight from 'ui-code-highlight/components/ui-code-highlight';
var typeOf = Ember.typeOf;

export default UiCodeHighlight.extend({
  layout: layout,
  referenceItem: null,
  ref: Ember.computed.alias('referenceItem'),
  
  // Initialize
  highlighter: Ember.on('didInsertElement', function() {
    let { configuration, referenceItem } = this.getProperties('configuration', 'referenceItem');
    let highlight;
    hljs.configure(configuration);
    console.log(referenceItem);
    if(typeOf(referenceItem) === 'function') {
      highlight = hljs.highlight('javascript', referenceItem.toString());
    } else {
      highlight = hljs.highlight('javascript', JSON.stringify(referenceItem));
    }

    this.$('code').html(highlight.value);
  })
});
