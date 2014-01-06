var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('invitation/index', {
      title: 'Tea on the lawn',
      articles: articles
    });
  });
};