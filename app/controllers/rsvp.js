// var mongoose = require('mongoose'),
//   Reply = mongoose.model('Reply');

// var db = mongoose.connection;

// exports.index = function(req, res){
//   res.render('rsvp/index', {
//     title: 'Tea on the lawn - Please RSVP',
//     navtitle: 'rsvp'
//   });
// };

// exports.reply = function(req, res){
//   var reply = new Reply({
//     names: req.body.names,
//     attending: req.body.attending,
//     livein: req.body.livein,
//     help: req.body.help,
//     arriving: req.body.arriving,
//     bbq: req.body.bbq,
//     breakfast: req.body.breakfast,
//     allergies: req.body.allergies
//   }).save(function(err, reply){
//     if(!err){
//       res.redirect('/thanks');
//     }else{
//       res.redirect('/failure');
//     }
//   });
// };

// exports.thanks = function(req, res){
//     res.render('rsvp/thanks', {
//       title: 'Tea on the lawn - Thank you',
//       navtitle: 'rsvp'
//     });
// };

// exports.failure = function(req, res){
//   res.render('rsvp/failure', {
//     title: 'Tea on the lawn - There has been a problem',
//     navtitle: 'rsvp'
//   });
// };

// exports.replies = function(req, res){
//   //get replies collection from DB
//   Reply.find(function(err, replies, count){
//     res.render('rsvp/replies', {
//       title: 'Tea on the lawn - rsvp',
//       navtitle: 'admin',
//       replies:replies
//     });
//   })
// };

// exports.delete = function ( req, res ){
//   Reply.findById( req.params.id, function ( err, reply ){
//     reply.remove( function ( err, reply ){
//       res.redirect( '/replies' );
//     });
//   });
// };
