Template.topic.helpers({
  subject: function(topic){
    var subj;
    _.each(Meteor.lessons, function(val, key){
      var sub = key;
      _.each(val, function(v, k){
        if(k == topic)
          subj = sub;
      });
    });
    return subj;
  }
});
