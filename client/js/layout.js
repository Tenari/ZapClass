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
  finished: function(){
    return Session.get('finished') != undefined;
  },
  lesson: function(){ return Session.get('lesson');}
});

var show_home = function(){ 
  clear_view();
  if (window.location.pathname != '/')
    window.location.pathname == '/';
};
var clear_view = function(level){
  var levels = ['finished', 'lesson started', 'lesson', 'show2', 'show'];
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
  'click #home': show_home,
  'tap #home': show_home,
  'click #subject': function(){ clear_view(4); },
  'tap #subject': function(){ clear_view(4); },
  'click #topic': function(){ clear_view(3); },
  'tap #topic': function(){ clear_view(3); }
});

Template.all.events({
  'click #logo': show_home,  
  'tap #logo': show_home,
  'click .lesson-btn': function(e){
    //show lesson
    Session.set('lesson', $(e.target).text());
  },
  'click .whiteboardContainerV': function(){
    if ($('#whiteboardContent').text() != "Click to start Learning.")
      return '';
    $.lesson(Meteor.lessons.find(Session.get('lesson'))).run();
  },
  'keypress #search': function(e){
    var list = [];
    var search = $(e.target).val().trim().toLowerCase() + String.fromCharCode(e.charCode);

    _.each(Meteor.lessons, function(val, key){
      if (key.toLowerCase().indexOf(search) != -1) list.push(key);
      _.each(val, function(val, key){ 
        if (key.toLowerCase().indexOf(search) != -1) list.push(key);
        _.each(val, function(val, key){ 
          if (key.toLowerCase().indexOf(search) != -1) list.push(key);
        });
      });
    });

    Meteor.effects.showList(list);
  },
  'focus #search':function(){
    $('.search-list').remove();
  },
  'click .search-list-item':function(e){
    var $e = $(e.target);
    var item = $e.text().trim();

    _.each(Meteor.lessons, function(val, key){
      if (key == item) Session.set('show', item);
      else {
        var subj = key;
        _.each(val, function(val, key){ 
          if (key == item) {
            Session.set('show', subj);
            Session.set('show2', item);
          }
          else{
            var topic = key;
            _.each(val, function(v, k){
              if (k == item){
                Session.set('show', subj);
                Session.set('show2', topic);
                Session.set('lesson', k);
              }
            });
          }
        });
      }
    });

    $('#search').val('');
  }  
});
