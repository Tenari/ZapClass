Template.finished.helpers({
  lessonId: function(){
    return Session.get('finished');
  },
  time: function(){
    var lesson = Lessons.findOne(Session.get('finished'));
    var start = lesson.start_time;
    var end = lesson.end_time;
    return ((end - start)/1000) + " seconds";
  },
  points: function(){
    var lesson = Lessons.findOne(Session.get('finished'));
    var earned = lesson.points_earned;
    var max = lesson.max_points;
    return ""+earned+" of "+max;
  },
  here: function(){
    return window.location.origin;
  }
});
