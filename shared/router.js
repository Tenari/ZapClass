Router.configure({
  layout: 'all'
});
Router.map(function(){
  this.route('layout', {path: '/'});
  this.route('subject', {
    path: '/subject/:id',
    data: function(){ return this.params.id;}
  });
  this.route('topic', {path: '/topic/:id'});
  this.route('lesson', {path: '/lesson/:id'});
  this.route('showResults', {
    path: '/results/:id',
    data: function(){ return Lessons.findOne(this.params.id); }
  });
});
