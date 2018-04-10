require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var request = require("request");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var command = process.argv[2];

var value = process.argv[3];

if(command === "spotify-this-song"){
	spotify.search({ type: 'track', query: value })
  .then(function(response) {
    console.log(response.tracks.items[0].artists[0].name);
    console.log(response.tracks.items[0].name);
    console.log(response.tracks.items[0].preview_url);
    console.log(response.tracks.items[0].album.name);
  }).catch(function(err) {
    console.log(err);
  });
}
if(command === "my-tweets"){
	var params = {screen_name: 'Christian Perez'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for(var i = 1; i < tweets.length; i++){
	  		console.log(tweets[i].created_at)
	  		console.log(tweets[i].text);
	  	}
	  }
	});
}
if(command === "movie-this"){
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  		if (!error && response.statusCode === 200) {
		  	console.log(JSON.parse(body).Title);
		  	console.log(JSON.parse(body).Year);
		  	console.log(JSON.parse(body).imdbRating);
		  	console.log(JSON.parse(body).Ratings[1].Value);
		  	console.log(JSON.parse(body).Country);
		  	console.log(JSON.parse(body).Language);
		  	console.log(JSON.parse(body).Plot);
		  	console.log(JSON.parse(body).Actors);

  		}
	});
}
if(command === "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data){
		var dataArr = data.split(",");
		spotify.search({ type: 'track', query: dataArr[1] })
		  .then(function(response) {
		    console.log(response.tracks.items[0].artists[0].name);
		    console.log(response.tracks.items[0].name);
		    console.log(response.tracks.items[0].preview_url);
		    console.log(response.tracks.items[0].album.name);
		  }).catch(function(err) {
		    console.log(err);
		  });
		
	})
}


