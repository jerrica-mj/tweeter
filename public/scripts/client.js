/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const moment = require("moment");
// moment().format();


 // Ensure that document is ready
 $(document).ready(() => {

  /**
   * Determines the time that has passed since a specified past date/time to the present, and returns that difference in appropriate units (minutes, hours, days, weeks, months, or years).
   * @param {number} pastDate The past date, in milliseconds, to compare with the present date.
   * @return {string} The time difference as part of a string with appropriate units (minutes, hours, days, weeks, months, or years).
   */
  const timeSince = function(pastDate) {
    const present = new Date().getTime();
  };


  /**
   * Generates the tweets to be displayed on the page. Takes in a tweet object and returns a tweet article with the entire HTML structure of the tweet.
   * @param {object} tweet  The tweet object to be transformed into HTML.
   * @return {string} The tweet in HTML structure for display on the page.
   */
  const createTweetElement = function(tweet) {
    // turn tweet data into an HTML tweet element/article
    const tweetHtml = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="tweet-user">
          <img class="user-image" src=${tweet.user.avatar} alt="User's avatar"></img>
          <div class="user-name">${tweet.user.name}</div>
        </div>
        <div class="user-handle">${tweet.user.handle}</div>
      </header>
      <div class="tweet-contents">${tweet.content.text}</div>
      <footer class="tweet-footer">
        <div class="tweet-date">Created at ${tweet.created_at}</div>
        <div class="tweet-buttons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
    // TODO: FIX .tweet-date to show the time since posted, in a readable format (hours, days, years(?))

    return tweetHtml;
  }


  // TEST / DRIVER CODE (TEMP) --> Will eventually get this from the server
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatar": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };


  // --------------------------
  // figure out date formatting
  // const now = new Date().getTime();
  // console.log(now);
  // console.log(tweetData.created_at);
  // const dateDiff = now - tweetData.created_at;
  // // calculate milliseconds in different time units for possible display
  // const oneMinute = 1000 * 60;
  // const oneHour = oneMinute * 60;
  // const oneDay = oneHour * 24;
  // const oneWeek = oneDay * 7;
  // const oneMonth = oneDay * 30; // average days in month
  // const oneYear = oneDay * 365;
  // console.log(dateDiff);
  // console.log(Math.floor(dateDiff/oneYear));
  // --------------------------


  const $tweet = createTweetElement(tweetData);

  console.log($tweet); // see what it looks like
  $("#tweets-container").append($tweet); // TEST add it to the page to make sure it has all the right elements, classes, etc.

 });