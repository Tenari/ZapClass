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

var makeLink = function(name, extra){
  return "<a href='"+Meteor.utility.linkForName(name)+"' class='lesson-btn button "+extra+"'>"
           +"<span>"+ name + "</span></a>";
};

Template.easy_expressions_tree.makeLink = makeLink;
Template.hard_expressions_tree.makeLink = makeLink;
Template.easy_inequalities_tree.makeLink = makeLink;
Template.easy_graphing_tree.makeLink = makeLink;
