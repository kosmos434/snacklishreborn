//TODO
// postgres setup
// heroku setup
// twitter setup

const { convert } = require("./converter.js");
const { Pool } = require("pg");
require("dotenv").config();
const axios = require("axios");
const URL = "https://www.reuters.com/assets/jsonWireNews";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

function getNews(url) {
  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response.data.headlines[0].headline);
      console.log(response.data.headlines[0].id);
      console.log(response.data.headlines[0].url);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// console.log(process.env.SHREK);
// getNews(URL);
process.env.testthing = "TEST";
console.log(process.env.testthing);
