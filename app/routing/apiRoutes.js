//data links
var friendsData = require("../data/friends");


module.exports = function(app) {
	//return possible friends in json format
	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	//add to
	app.post("/api/friends", function(req, res) {
		var incomingData = req.body;
		var stringScores = incomingData.scores;
		//change values to numbers (sent as strings)
		for (i=0; i<stringScores.length; i++){
			var nowNumber = parseInt(stringScores[i]);
			stringScores[i] = nowNumber;
		}

		//find match for friend
		var matchFriendIndex;
		var matchFriendScore;

		//run for each existing friend
		for(i=0; i<friendsData.length; i++){
			var existingFriendArray = friendsData[i].scores;
			var currentCompatibility = 0;

			//comparge values and find difference
			for (j=0; j < existingFriendArray.length; j++){
				currentCompatibility += Math.abs(existingFriendArray[j] - incomingData.scores[j]);
			}

			//determine if difference
			if(i === 0){
				matchFriendIndex = i;
				matchFriendScore = currentCompatibility;
			} else if (currentCompatibility < matchFriendScore) {
				matchFriendIndex = i;
				matchFriendScore = currentCompatibility;
			}
			// console.log("Match Score:",matchFriendScore);
			// console.log("Match Index:",matchFriendIndex);
		}

		//send back data of matched friend
		res.json(friendsData[matchFriendIndex]);

		//add newly submitted survey to friends database
    	friendsData.push(incomingData);

  	});
};
