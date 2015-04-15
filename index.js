/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-code-highlight',
  included: function(app) {
    this._super.included(app);
    
    var config = this.app.project.config().uiCodeHighlight || { style: 'github', js: true };
    
    if(config.style)  {
      // app.import('node_modules')
    }
    app.import('bower_components/highlightjs/highlight.pack.js');
    app.import('bower_components/highlightjs/styles/docco.css');
    app.import('vendor/ui-code-highlight/ui-code-highlight.css');
  }
};
