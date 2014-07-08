exports.index = function(req, res){
    res.render('weloveyou/index', {
      title: 'Tea on the lawn - We love you',
      navtitle: 'weloveyou'
    });

};