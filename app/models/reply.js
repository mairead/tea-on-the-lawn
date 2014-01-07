// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReplySchema = new Schema({
  names: String,
  attending: String,
  livein: String,
  help: String,
  arriving: String,
  bbq: String,
  breakfast: String,
  allergies: String
});

mongoose.model('Reply', ReplySchema);

