import Ember from 'ember';

export default Ember.Controller.extend({

  isRepressed: false,
  toggledEnablement: false, 
  
  actions: {
    toggleRepression: function() {
      console.log('toggling');
      this.toggleProperty('isRepressed');
    },
    toggleEnablement: function() {
      console.log('toggling');
      this.toggleProperty('toggledEnablement');
    }
  },
  
  snippetJSON: '{ "foo": "bar", "bar": "baz" }',
  snippetArray: ['one','two','three','four'],
  snippetFunction: function(x) {
    return x + x;
  },
  

});