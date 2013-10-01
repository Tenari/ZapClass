Router.configure({
  layout: 'all'
});
Router.map(function(){
  this.route('layout', {path: '/'});
  this.route('subject', {
    path: '/subject/:id',
    data: function(){ return this.params.id;}
  });
  this.route('topic', {
    path: '/topic/:id',
    data: function(){ return this.params.id;}  
  }, function(){
    switch(this.params.id){
      case 'Variables':
        this.render('variables_tree');
        break;
      case 'Easy Expressions':
        this.render('easy_expressions_tree');
        break;
      case 'Hard Expressions':
        this.render('hard_expressions_tree');
        break;
      case 'Easy Equations':
        this.render('easy_equations_tree');
        break;
      case 'Easy Inequalities':
        this.render('easy_inequalities_tree');
        break;
      case 'Easy Graphing':
        this.render('easy_graphing_tree');
        break;
      case 'Easy Applications':
      default:
        this.render('easy_applications_tree');
        break;
    }
  });
  this.route('lesson', {
    path: '/lesson/:id',
    data: function(){ return this.params.id; }
  }, function(){
    Session.set('lesson', this.params.id);
    this.render();
  });
  this.route('showResults', {
    path: '/results/:id',
    data: function(){ return Lessons.findOne(this.params.id); }
  });
  this.route('make');
});
