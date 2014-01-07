

exports.index = function(req, res){
 

    res.render('accommodation/index', {
      title: 'Tea on the lawn - accommodation',
      navtitle: 'accommodation'
    });

};