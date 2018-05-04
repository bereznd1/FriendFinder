//Allows this file to use the object data in the friends.js file
var friendData = require("../data/friends");

//Exports the various server functions so that they can be used in the "server.js" file
module.exports = function (app) {

    //Sets up a route that displays raw JSON information for all members currently on the server when the "/api/friends" url is hit by the browser
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    //Sets up what happens when new member data is posted to the server
    app.post("/api/friends", function (req, res) {

        //This holds the new member object that was submitted on the survey page
        var newUser = req.body;

        //This sets up an array to hold all the total differences between the new user & each other user on the server
        var totalDiffArray = [];

        //This loop runs through all the other users on the server
        for (var i = 0; i < friendData.length; i++) {

            //Finds the difference between each item in the new user's scores array with the corresponding item in each of the other users' scores arrays
            var diff1 = Math.abs(Number(newUser.scores[0]) - Number(friendData[i].scores[0]));
            var diff2 = Math.abs(Number(newUser.scores[1]) - Number(friendData[i].scores[1]));
            var diff3 = Math.abs(Number(newUser.scores[2]) - Number(friendData[i].scores[2]));
            var diff4 = Math.abs(Number(newUser.scores[3]) - Number(friendData[i].scores[3]));
            var diff5 = Math.abs(Number(newUser.scores[4]) - Number(friendData[i].scores[4]));
            var diff6 = Math.abs(Number(newUser.scores[5]) - Number(friendData[i].scores[5]));
            var diff7 = Math.abs(Number(newUser.scores[6]) - Number(friendData[i].scores[6]));
            var diff8 = Math.abs(Number(newUser.scores[7]) - Number(friendData[i].scores[7]));
            var diff9 = Math.abs(Number(newUser.scores[8]) - Number(friendData[i].scores[8]));
            var diff10 = Math.abs(Number(newUser.scores[9]) - Number(friendData[i].scores[9]));

            //Adds together the differences for each item to create a total difference value
            var totalDifference = diff1 + diff2 + diff3 + diff4 + diff5 + diff6 + diff7 + diff8 + diff9 + diff10;

            //Pushes the total difference value into the current user (at this point in the loop) scores array as the last item
            friendData[i].scores.push(totalDifference);

            //Pushes the total difference value into the array set up previously to hold all the total differences
            totalDiffArray.push(totalDifference);

        }

        //Finds the least total difference within the totalDiffArray
        var leastDifference = Math.min(...totalDiffArray);

        //Sets up an empty array to hold the entire user object of whichever user has the least total difference with the new user
        var bestMatch = [];

        //Loops through all the other users on the server besides the new user 
        for (var i = 0; i < friendData.length; i++) {

            //If the least difference from the totalDiffArray matches the user in question's final item in their scores array...
            if (leastDifference === friendData[i].scores[10]) {

                //Push that user's entire user object into the best match array
                bestMatch.push(friendData[i]);
            }
        }

        //Loops through all the other users on the server besides the new user 
        for (var i = 0; i < friendData.length; i++) {

            //Pops off the last item in that user's scores array (the total difference value between that user and the new user) so that it doesn't interfere with future calculations
            friendData[i].scores.pop();

        }

        //Sends the first item in the bestMatch array to the front end so it can be displayed in the modal
        res.json(bestMatch[0]);

        //Pushes the new user into the array holding all users
        friendData.push(newUser);
    });


};