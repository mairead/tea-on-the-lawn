

exports.index = function(req, res){
  
  
    res.render('food-and-drink/index', {
      title: 'Tea on the lawn - Food and drink',
      navtitle: 'food-and-drink'
    });

};