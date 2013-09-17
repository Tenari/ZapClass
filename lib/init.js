Meteor.lessons = {
  'Algebra': {},
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
        $list.append('<p class="search-list-item">'+element+'</p>');
      });
    }
  }
};
