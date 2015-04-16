import Ember from 'ember';

export default Ember.Controller.extend({

  isRepressed: false,
  toggledEnablement: false, 
  
  actions: {
    toggleRepression: function() {
      this.toggleProperty('isRepressed');
    },
    toggleEnablement: function() {
      this.toggleProperty('toggledEnablement');
    }
  },
  
  snippetJSON: '{ "foo": "bar", "bar": "baz" }',
  snippetArray: ['one','two','three','four'],
  snippetFunction: function(x) {
    return x + x;
  },
  

});