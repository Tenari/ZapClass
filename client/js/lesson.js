Template.lesson.helpers({
  finished: function(){
    return Session.get('finished') == true;
  }
});

Template.lesson_head.helpers({
  subject: function(lesson){
    var subj;
    _.each(Meteor.lessons, function(val, key){
      var sub = key;
      _.each(val, function(v, k){
        _.each(v, function(val2, key2){
          if(key2 == lesson)
            subj = sub;
        });
      });
    });
    return subj;
  },
  topic: function(lesson){
    var topic;
    _.each(Meteor.lessons, function(val, key){
      _.each(val, function(v, k){
        var temp_topic = k;
        _.each(v, function(val2, key2){
          if(key2 == lesson)
            topic = temp_topic;
        });
      });
    });
    return topic;
  }
});
