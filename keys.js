// console.log("this is loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.seatgeek = {
  clientKey: process.env.SEATGEEK_CLIENT_ID
};

exports.omdb = {
  APIkey: process.env.OMDB_APIKEY
};
