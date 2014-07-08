exports.index = function(req, res){
    res.render('thankyous/index', {
      title: 'Tea on the lawn - Thank yous',
      navtitle: 'thankyous'
    });

};