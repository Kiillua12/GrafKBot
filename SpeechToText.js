var google_speech = require('google-speech');

var config = require('./config.js');

function speech (param = "default") {
	this.mySpeech = param;
}

speech.prototype.googleSpeech = function() {
	google_speech.ASR({
    developer_key: config.tokenGoogle,
    file: 'data/1.wav',
  }, function(err, httpResponse, xml){
    if(err){
        console.log(err);
      }else{
        console.log(httpResponse.statusCode, xml)
      }
    });
 }
 
 speech.prototype.test = function() {
	 return this.mySpeech;
 }
 
 module.exports = speech;