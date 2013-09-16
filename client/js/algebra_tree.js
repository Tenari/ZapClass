Template.algebra_tree.helpers({
  show: function(item){
    return Session.get('show2') == item;
  },
  showing: function(){
    return Session.get('show2');
  },
  user_has_selected: function(){
    return Session.get('show2') != undefined;
  }
});

Template.algebra_tree.events({
  'click .tree-btn': function(e){
    Session.set('show2', $(e.target).text());
  }
});
