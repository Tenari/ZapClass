Template.showResults.helpers({
  lessonId: function(object){
    return object._id;
  },
  time: function(record){
    var start = record.start_time;
    var end = record.end_time;
    return ((end - start)/1000).toFixed(2) + " seconds";
  },
  avg_time: function(record){
    var all = Lessons.find({lesson: record.lesson}).fetch();
    var sum = 0;
    _.each(all, function(elem, index){
      sum = sum + ((elem.end_time - elem.start_time)/1000);
    });
    return (sum/all.length).toFixed(2) + " seconds";
  },
  best_time: function(record){
    var all = Lessons.find({lesson: record.lesson}).fetch();
    var best = 0;
    _.each(all, function(e, i){
      if (best < (e.end_time - e.start_time))
        best = (e.end_time - e.start_time)/1000;
    });
    return best.toFixed(2) + " seconds";
  },
  points: function(record){
    var earned = record.points_earned;
    var max = record.max_points;
    return ""+earned+" of "+max;
  },
  avg_points: function(record){
    var all = Lessons.find({lesson: record.lesson}).fetch();
    var sum = 0;
    _.each(all, function(elem, index){
      if (elem.points_earned != undefined)
      sum = sum + elem.points_earned;
    });
    return (sum/all.length);
  },
  perfect: function(record){
    var all = Lessons.find({lesson: record.lesson}).fetch();
    var count = 0;
    _.each(all, function(elem, index){
      if (elem.points_earned != undefined 
          && elem.max_points != undefined 
          && elem.points_earned == elem.max_points)
          count++;
    });
    return (count/all.length) * 100;
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
