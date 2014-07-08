exports.index = function(req, res){
    res.render('photos/index', {
      title: 'Tea on the lawn - photos',
      navtitle: 'photography'
    });

};