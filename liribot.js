require("dotenv").config();
const inquirer = require("inquirer");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const keys = require("./keys.js");

// console.log(keys.spotify) to see if it's linking correctly;
const spotify = new Spotify(keys.spotify);

// wrap everything in a function
function cli() {
  // Make it so liri.js can take in one of the following commands:
  inquirer
    .prompt([
      {
        type: "list",
        message: "Hi I'm LIRI, can I help you find something?",
        choices: [
          "Find upcoming shows for a certain band",
          "Find a song on Spotify",
          "Find information on your favorite movie",
          "Search for something random"
        ],
        name: "selection"
      }
    ])
    .then(function(searchType) {
      if (searchType.selection === "Find upcoming shows for a certain band") {
        // function(concertThis) {
        console.log(
          "HERE YOU WILL PUT THE PROMPT FOR BAND SEARCHES followed by the search"
        );
        // concert-this
        // https://api.seatgeek.com/2/events?performers.slug=<PERFORMER-STRING>&client_id=<CLIENT_ID>"
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        // } // closes concertThis function
      }
      if (searchType.selection === "Find a song on Spotify") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What song?",
              name: "songSelection",
              default: `"The Sign" Ace of Base`
            }
          ])
          .then(function(spotifyThisSong) {
            spotify.search(
              { type: "track", query: `${spotifyThisSong.songSelection}` },
              function(err, data) {
                if (err) {
                  return console.log("Error occurred: " + err);
                }
                //   console.log(JSON.stringify(data.tracks.items[0], null, 5));
                console.log(
                  "Song Name: ",
                  JSON.stringify(data.tracks.items[0].name, null, 2)
                );
                console.log(
                  "Performed by: ",
                  JSON.stringify(
                    data.tracks.items[0].album.artists[0].name,
                    null,
                    2
                  )
                );
                console.log(
                  "From the Album: ",
                  JSON.stringify(data.tracks.items[0].album.name, null, 2)
                );
                console.log(
                  "Preview Link: ",
                  JSON.stringify(
                    data.tracks.items[0].external_urls.spotify,
                    null,
                    2
                  )
                );
              }
            ); // closes spotify API search
          }); // closes then for spotify prompt
      } // closes if for "Find a song on Spotify
      // } // closes spotifyThisSong function
      if (searchType.selection === "Find information on your favorite movie") {
        // function(concertThis) {
        console.log(
          "HERE YOU WILL PUT THE PROMPT FOR MOVIES followed by the search"
        );
      } // closes movie movie-this if
      if (searchType.selection === "Search for something random") {
        // function(concertThis) {
        console.log(
          "HERE YOU WILL PUT THE PROMPT FOR RANDOM followed by the search"
        );
      } // closes random do-what-it-says if
    }); // closes then after intial inquirer
} // closes cli function
cli();
