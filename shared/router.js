Router.configure({
  layout: 'all'
});
Router.map(function(){
  this.route('layout', {path: '/'});
  this.route('showResults', {
    path: '/results/:id',
    data: function(){ return Lessons.findOne(this.params.id); }
  });
});
