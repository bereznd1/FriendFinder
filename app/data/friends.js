//Array that will hold each user's submitted information. First user is predefined as a sample.
var friendsArray = [
    {
        name: "Ahmed",
        photo: "http://orig00.deviantart.net/24ea/f/2014/123/5/a/the_sultan_ahmed_iii_by_eduartinehistorise-d7gytgx.jpg",
        scores: [
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
        ]
    }
];

//Exports the array of users to make it accessible to other files, using require.
module.exports = friendsArray;