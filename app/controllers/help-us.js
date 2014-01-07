var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('help-us/index', {
      title: 'Tea on the lawn - We need your help',
      articles: articles,
      title: 'help-us'
    });
  });
};