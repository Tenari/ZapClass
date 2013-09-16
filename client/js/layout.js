Template.layout.helpers({
  show: function(item){
    return Session.get('show') == item;
  },
  showing: function(){
    return Session.get('show');
  },
  show2: function(){
    return Session.get('show2') != undefined;
  },
  showing2: function(){
    return Session.get('show2');
  },
  user_has_selected: function(){
    return Session.get('show') != undefined;
  },
  in_lesson: function(){
    return Session.get('lesson') != undefined;
  },
  lesson: function(){ return Session.get('lesson');}
});

var show_home = function(){ clear_view();};
var clear_view = function(level){
  var levels = ['lesson started', 'lesson', 'show2', 'show'];
  if (level == undefined) level = levels.length;

  for (var i = 0; i < level; i++){
    Session.set(levels[i], undefined);
  }
};
Template.layout.events({
  'click .nav-btn': function(e){
    Session.set('show', $(e.target).text());
  },
  'tap .nav-btn': function(e){
    Session.set('show', $(e.target).text());
  },
  'click #logo': show_home,  
  'click #home': show_home,
  'tap #logo': show_home,  
  'tap #home': show_home,
  'click #subject': function(){ clear_view(3); },
  'tap #subject': function(){ clear_view(3); },
  'click #topic': function(){ clear_view(2); },
  'tap #topic': function(){ clear_view(2); },
  'click .lesson-btn': function(e){
    //show lesson
    Session.set('lesson', $(e.target).text());
  },
  'click .whiteboardContainerV': function(){
    if (Session.get('lesson started'))
      return '';
    Session.set('lesson started', true);
    $.lesson(Meteor.lessons.algebra[Session.get('lesson')]).run();
  }
});
