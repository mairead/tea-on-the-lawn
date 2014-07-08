// var db = require("../app").db;

module.exports = function(app){
	//home route
	var invitation = require('../app/controllers/invitation');
	app.get('/', weloveyou.index);

	var accommodation = require('../app/controllers/accommodation');
	app.get('/accommodation', accommodation.index);

	var foodanddrink = require('../app/controllers/food-and-drink');
	app.get('/food-and-drink', foodanddrink.index);

	var helpus = require('../app/controllers/help-us');
	app.get('/help-us', helpus.index);

	var instructions = require('../app/controllers/instructions');
	app.get('/instructions', instructions.index);

	var photos = require('../app/controllers/photos');
	app.get('/photos', photos.index);

	var thankyous = require('../app/controllers/thankyous');
	app.get('/thankyous', thankyous.index);

	var weloveyou = require('../app/controllers/weloveyou');
	app.get('/weloveyou', weloveyou.index);

	// var rsvp = require('../app/controllers/rsvp');
	// app.get('/rsvp', rsvp.index);
	// app.post('/reply', rsvp.reply);
	// app.get('/thanks', rsvp.thanks);
	// app.get('/failure', rsvp.failure);
	// app.get('/replies', rsvp.replies);
	// app.get('/delete/:id', rsvp.delete);
};
