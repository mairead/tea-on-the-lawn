

exports.index = function(req, res){

 
    res.render('invitation/index', {
      title: 'Tea on the lawn',
      navtitle: 'invitation'
    });
  
};