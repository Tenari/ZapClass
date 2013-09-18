Template.showResults.helpers({
  lessonId: function(object){
    return object._id;
  },
  time: function(record){
    var start = record.start_time;
    var end = record.end_time;
    return ((end - start)/1000) + " seconds";
  },
  points: function(record){
    var earned = record.points_earned;
    var max = record.max_points;
    return ""+earned+" of "+max;
  },
  title: function(record){
    var title = "";
    _.each(Meteor.lessons, function(val, key){
      if (record.lesson.indexOf(key) != -1)
        _.each(val, function(val, key){
          if(record.lesson.indexOf(key) != -1)
            _.each(val, function(val, key){
              if(record.lesson.indexOf(key) !=-1)
                title = key;
            });
        });
    });
    return title;
  }
});
