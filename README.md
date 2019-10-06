# LiriBot

(Homework 10 due Saturday 10/5/19)

## What is LiriBot?

LiriBot is a Command Line Interface App that allows users to search for Entertainment information - either movies (via OMDB), music (via Spotify), or search for when a band will be performing (via SeatGeek). Liri's Choice is a way of finding out about any of these types of searches but from a predetermined file.

### Concert information you will receive

1. Artist Name (which you will provide)
2. Venue, City of show
3. Date of the event

### Song information you will receive

1. Song Name (which you will provide)
2. Artist(s)
3. Album the song track is from
4. A link to a preview from Spotify

### Movie information you will receive

1. Title of the movie.
2. Year the movie came out.
3. IMDB Rating of the movie.
4. Rotten Tomatoes Rating of the movie.
5. Country where the movie was produced.
6. Language of the movie.
7. Plot of the movie.
8. Actresses/Actors in the movie.

## Getting Started

NPM dependencies:

- axios (for Seatgeek and OMDB)
- node-spotify-api
- moment
- dotenv
- inquirer
- fs

After pulling this folder to your computer -- To use LiriBot, please make sure to load all of your npm packages as listed above. You will also need your own .env file to live in the folder, that will contain your own Spotify API Key and Secret. In the body of the .env file, you will write:

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

(replacing the values after the "=" with your own).

## How to use

1. It's very easy to use LiriBot! Just run the app (node liribot.js) from your command line and follow the prompts.
2. Make your selections by scrolling "up" or "down" with the arrow keys and then hit "return".
3. When prompted, type in your search (no need for quotations or camelCasing)
4. Hit "return" to see the magic happen
5. Repeat as needed!
6. You may also see a log of previous searches in the log.txt file

## My Role:

Developer!

## Video of LiriBot in Action!

Apologies - Only Music and Movies is working right now, but update soon to come!
https://drive.google.com/file/d/1lItoscZSBSJedE9qrKCsivyq1llk2td2/view

<!-- LINK TO VIDEO -->
