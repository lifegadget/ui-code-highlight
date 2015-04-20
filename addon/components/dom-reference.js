import Ember from 'ember';
import layout from '../templates/components/ui-code-highlight';
import UiCodeHighlight from 'ui-code-highlight/components/ui-code-highlight';

export default UiCodeHighlight.extend({
  layout: layout,
  referenceItem: null,
  ref: Ember.computed.alias('referenceItem'),
  selector: Ember.computed.alias('referenceItem'),
  referenceObserver: Ember.observer('referenceItem', function() {
    this.highlighter();
  }),
  
  // Initialize
  highlighter: Ember.on('didInsertElement', function() {
    let configuration = this.get('configuration');
    let domElement = this.get('referenceItem');
    let stripComments = (html) => {
      return  html.replace(/<\![\-]+\>/gm,'');
    };
    hljs.configure(configuration);
    let shadowDom = stripComments(window.$(domElement).html());
    let highlight = hljs.highlightAuto(shadowDom);
    // only set DOM if change exists
    if(highlight.value !== shadowDom) {
      this.$('code').html(highlight.value);
    }
  })
});
