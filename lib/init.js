Meteor.lessons = {
  algebra: {},
  pre_algebra: {},
  map: function(full_name){
    switch(full_name){
      case 'Intro to Variables':
      default:
        return Meteor.lessons.algebra.l1;
    }
  }
};
