require("dotenv").config();
const inquirer = require("inquirer");
const seatgeek = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const keys = require("./keys.js");

// // link seatgeek key to this file - NEED TO FIGURE OUT FOR LATER
// seatgeek.connect({
//   clientKey: process.env.SEATGEEK_CLIENT_ID
// });

// console.log(keys.spotify) to see if it's linking correctly;
const spotify = new Spotify(keys.spotify);

// wrap everything in a function
function cli() {
  // Create a Divider for outputs
  const divider =
    "\n------------------------------------------------------------\n\n";
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
        // console.log(
        //   "HERE YOU WILL PUT THE PROMPT FOR BAND SEARCHES followed by the search"
        // );
        inquirer
          .prompt([
            {
              type: "input",
              message: "What artist/band?",
              name: "bandSelection",
              default: "Sigrid"
            }
          ])
          .then(function(concertThis) {
            const seatgeekClientKey = "MTg3NjM0ODJ8MTU3MDMwMjk2Mi41Nw"; // eventually do a dotenv if time
            // console.log(
            //   `band selection is working - ${concertThis.bandSelection}`
            // );
            const bandSearchURL = `https:api.seatgeek.com/2/events?performers.slug=${concertThis.bandSelection}&client_id=${seatgeekClientKey}`;
            axios
              .get(bandSearchURL)
              .then(function(response) {
                const JSONdata = JSON.stringify(response.events, null, 2);
                // console.log(JSONdata);
                const concertData = [
                  "Artist: " + JSONdata.title,
                  "Venue: " +
                    JSONdata.venue.name +
                    ", " +
                    JSONdata.venue.display_location,
                  "Date of the Show: " +
                    moment.utc(JSONdata.daytime_local).format("MM-DD-YYYY")
                ].join("\n");
                console.log("\n" + concertData + divider);
              })
              .catch(function(err, data) {
                if (err) {
                  return console.log("Error occurred: " + err);
                }
              }); // closes axios search
          }); // closes the then concert this function for band searches
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
                // //   console.log(JSON.stringify(data.tracks.items[0], null, 5));
                // console.log(
                //   "Song Name: ",
                //   JSON.stringify(data.tracks.items[0].name, null, 2)
                // );
                // console.log(
                //   "Performed by: ",
                //   JSON.stringify(
                //     data.tracks.items[0].album.artists[0].name,
                //     null,
                //     2
                //   )
                // );
                // console.log(
                //   "From the Album: ",
                //   JSON.stringify(data.tracks.items[0].album.name, null, 2)
                // );
                // console.log(
                //   "Preview Link: ",
                //   JSON.stringify(
                //     data.tracks.items[0].external_urls.spotify,
                //     null,
                //     2
                //   )
                // );
                const songData = [
                  "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),
                  "Performed by: " +
                    JSON.stringify(
                      data.tracks.items[0].album.artists[0].name,
                      null,
                      2
                    ),
                  "From the album: " +
                    JSON.stringify(data.tracks.items[0].album.name, null, 2),
                  "Preview link: " +
                    JSON.stringify(
                      data.tracks.items[0].external_urls.spotify,
                      null,
                      2
                    )
                ].join("\n");
                // add to the file and print
                fs.appendFile("log.txt", songData + divider, function(err) {
                  if (err) throw err;
                  console.log("\n" + songData + divider);
                }); // closes append
              }
            ); // closes spotify API search
          }); // closes then for spotify prompt
      } // closes spotify if
      if (searchType.selection === "Find information on your favorite movie") {
        // function(concertThis) {
        // console.log(
        //   "HERE YOU WILL PUT THE PROMPT FOR MOVIES followed by the search"
        // );
        inquirer
          .prompt([
            {
              type: "input",
              message: "What movie?",
              name: "movieSelection",
              default: "Mr. Nobody"
            }
          ])
          .then(function(movieThis) {
            const movieSearchURL = `http://www.omdbapi.com/?t=${movieThis.movieSelection}&apikey=trilogy`;
            // console.log(`The movie you chose is ` + movieThis.movieSelection);
            axios
              .get(movieSearchURL)
              .then(function(response) {
                const JSONmovieData = JSON.stringify(response, null, 2);
                console.log(JSONmovieData.Title);
              }) // closes then response
              .catch(function(err, data) {
                if (err) {
                  return console.log("Error occurred: " + err);
                }
              });
          }); // closes then movieThis

        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
      } // closes movie if
      if (searchType.selection === "Search for something random") {
        // function(concertThis) {
        console.log(
          "HERE YOU WILL PUT THE PROMPT FOR RANDOM followed by the search"
        );
      } // closes random do-what-it-says if
    }); // closes then after intial inquirer
} // closes cli function
cli();
