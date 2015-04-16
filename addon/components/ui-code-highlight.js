import Ember from 'ember';
import layout from '../templates/components/ui-code-highlight';
var typeOf = Ember.typeOf;

export default Ember.Component.extend({
  layout: layout,
  isPre: true,
  tagName: 'pre',
  classNames: ['ui-code-highlight'],
  classNameBindings: ['border'],
   
  language: 'auto',
  languages: Ember.computed.alias('language'),
  lang: Ember.computed.alias('language'),
  langs: Ember.computed.alias('language'),
  _languageObserver: Ember.on('init', Ember.observer('language', function() {
    let l = this.get('language');
    let lc = l.toLowerCase();
    let fixer = new Map([
      ['js', 'javascript'],
      ['hbs', 'handlebars'],
      ['md', 'markdown']
    ]);
    lc = fixer.has(lc) ? fixer.get(lc) : lc;
    // set if changed
    if (lc !== l) {
      this.set('language', lc);
    }
  })),
  poll: null,
  _pollObserver: Ember.on('init', Ember.observer('poll',function() {
    let pollInterval = this.get('poll');
    if(pollInterval) { 
      let pollHandle = Ember.run.later(this, () => {
        this.highlighter();
        this._pollObserver();
      }, pollInterval);
      this.set('_pollHandle', pollHandle);
    } 
  })),
  _pollHandleDestroyer: Ember.on('willDestroyElement', function() {
      let pollHandle = this.get('_pollHandle');
      if(pollHandle) {
          Ember.run.cancel(pollHandle);
      }
  }),
  tabReplace: '    ',
  classPrefix: 'hljs-',
  useBR: null,
  _useBR: Ember.on('init', function() {
    let { isPre, useBR } = this.getProperties('isPre', 'useBR');
    if (useBR) {
      return;
    }
    else {
      this.set('useBR', !isPre);
    }
  }),
  codeClass: Ember.on('init', Ember.computed('language', function() {
    let fixed = Ember.A(['hljs']);
    return fixed.concat(this.get('language')).join(' ');
  })),
  configuration: Ember.on('init', Ember.computed('language','tabReplace','classPrefix','useBR', function() {
    let { language,tabReplace,classPrefix,useBR } = this.getProperties( 'language','tabReplace','classPrefix','useBR' );
    let configuration = {
      tabReplace: tabReplace,
      useBR: useBR,
      classPrefix: classPrefix
    };
    let autoValues = new Set(['auto',false,null]);
    if(!autoValues.has(language)) {
      if(typeOf(language) !== 'array') {
        language = [ language ];
      }
      configuration.languages = language;
    }
    
    return configuration;
  })),

  // Initialize
  highlighter: Ember.on('didInsertElement', function() {
    let configuration = this.get('configuration');
    let stripComments = (html) => {
      return  html.replace(/<\![\-]+\>/gm,'');
    };
    hljs.configure(configuration);
    let shadowDom = stripComments(this.$('.shadow-dom').html());
    let highlight = hljs.highlightAuto(shadowDom);
    this.$('code').html(highlight.value);
  })
});
