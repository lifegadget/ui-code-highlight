/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-code-highlight',
  description: 'Code highlighting on Ember-CLI projects using highlight.js',
  included: function(app) {
    this._super.included(app);
    var env = app.project.config().uiCodeHighlight || { }; // env or non-evn settings in environment.js file
    var emberCLIVersion = app.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
    var config = app.options['ui-code-highlight'] || { style: 'docco'}; // non-env specific settings set in Brocfile
    
    app.import('vendor/ui-code-highlight/ui-code-highlight.css');
    app.import('bower_components/highlightjs/highlight.pack.js');
    
    if(config.style)  {
      app.import('bower_components/highlightjs/styles/' + config.style + '.css');
    } 
  }
};
