

exports.index = function(req, res){
 

    res.render('instructions/index', {
      title: 'Tea on the lawn - instructions',
      navtitle: 'instructions'
    });
};