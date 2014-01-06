module.exports = function(app){

	//home route
	var invitation = require('../app/controllers/invitation');
	app.get('/', invitation.index);

	var accommodation = require('../app/controllers/accommodation');
	app.get('/accommodation', accommodation.index);

	var foodanddrink = require('../app/controllers/food-and-drink');
	app.get('/food-and-drink', foodanddrink.index);

	var helpus = require('../app/controllers/help-us');
	app.get('/help-us', helpus.index);

	var instructions = require('../app/controllers/instructions');
	app.get('/instructions', instructions.index);

	var rsvp = require('../app/controllers/rsvp');
	app.get('/rsvp', rsvp.index);

};
