Meteor.lessons = {
  'Algebra': {
    'Variables':{},
    'Easy Expressions':{},
    'Hard Expressions':{},
    'Easy Equations':{},
    'Easy Inequalities':{},
    'Easy Applications':{},
    'Easy Graphing':{}
  },
  'Pre-Algebra': {}
};
Meteor.effects = {
  showList: function(list, searchbar){
    if (searchbar == undefined) searchbar = $("#search");
    $('.search-list').remove();
    
    if (list.length != 0){
      searchbar.parent().append("<div class='search-list'></div>");
      var $list = $('.search-list:first');

      _.each(list, function(element, index){
        if (index < 13)
        $list.append('<a href="'+Meteor.utility.linkForName(element)+'" class="search-list-item">'+element+'</a>');
      });
    }
  }
};

Meteor.utility = {
  find: function(lesson_name){
    var subj, topic, lesson;
    _.each(Meteor.lessons, function(val, key){
      subj = key;
      _.each(val, function(val, key){ 
        topic = key;
        _.each(val, function(val, key){ 
          if (key == lesson_name) 
            lesson = Meteor.lessons[subj][topic][lesson_name];
        });
      });
    });
    return lesson;
  },
  linkForName: function(name){
    var link = "";
    _.each(Meteor.lessons, function(val, key){
      if (name == key){
        link = "/subject/" + key;
      } else {
        _.each(val, function(val, key){ 
          if (name == key){
            link = "/topic/" + key;
          } else {
            _.each(val, function(val, key){ 
              if (key == name) 
                link = "/lesson/" + key;
            });
          }
        });
      }
    });
    return link;
  }
};
