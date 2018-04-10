// initail variables for retrieving files
require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var request = require("request");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

//variables for commandline arguements
var command = process.argv[2];

var value = process.argv[3];

//access spotify api
function Music (){
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

//access twitter api
function twitter(){	
	var params = {screen_name: value};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for(var i = 1; i < tweets.length; i++){
	  		console.log(tweets[i].created_at)
	  		console.log(tweets[i].text);
	  	}
	  }
	});
}

//acess omdb api
function movie() {
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

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

//sets up paramaters for command
if(command === "spotify-this-song"){
	
	return Music();
	
}
if(command === "my-tweets"){
	
	return twitter();
}
if(command === "movie-this"){
	
	return movie();
}
if(command === "do-what-it-says"){
	//reads random.txt file and commences command
	fs.readFile("random.txt", "utf8", function(error, data){
		var dataArr = data.split(",");
		if(dataArr[0] === "spotify-this-song"){
			value = dataArr[1];
			return Music();
		}
		if(dataArr[0] === "movie-this"){
			value = dataArr[1];
			return movie();
		}
		if(dataArr[0] === "my-tweets"){
			return twitter();
		}
		else{
			console.log("check random.txt and input proper command")
		}
	})
}
//in case command is invalid
else{
	console.log("not an available command" + "\ntry either spotify-this-song"
		, "\nmy-tweets", "\nmovie-this", "\ndo-what-it-says");
}


