var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('food-and-drink/index', {
      title: 'Tea on the lawn - Food and drink',
      articles: articles,
      title: 'food-and-drink'
    });
  });
};