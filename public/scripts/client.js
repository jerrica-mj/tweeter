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
   * Asynchronous AJAX POST request to send new tweet form data to the server.
   */
  $(function() {
    // on form submission, carry out function
    $("#new-tweet-form").submit(function(event) {
      // prevent the default submission behaviour
      event.preventDefault();

      // perform an AJAX POST request, sending the serialized form data to the server
      console.log("Tweet button clicked, performing ajax call...");
      $.ajax("/tweets/", {
        method: "POST",
        data: $(this).serialize()
      })
      // Request completion handler
      .then(function(returnValue) {
        console.log("AJAX POST request complete");
        console.log(returnValue);
      });
    });
  });



  /**
   * Determines the time that has passed since a specified past date/time to the present, and returns that difference in appropriate units (minutes, hours, days, weeks, months, or years).
   * @param {number} pastDate The past date, in milliseconds, to compare with the present date.
   * @return {string} The time difference as part of a string with appropriate units (minutes, hours, days, weeks, months, or years).
   */
  const timeSince = function(pastDate) {
    const present = new Date().getTime();
    const timeAgo = present - pastDate; // in ms
    // convert timeAgo into different units, rounded down to whole numbers
    const secondsAgo = Math.floor(timeAgo / (1000));
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30); // average days per month
    const yearsAgo = Math.floor(daysAgo / 365);
    // use the biggest time frame <= 1 unit, rounded down
    if (yearsAgo >= 1) {
      return `${yearsAgo} years ago`;
    }
    else if (monthsAgo >= 1) {
      return `${monthsAgo} months ago`;
    }
    else if (weeksAgo >= 1) {
      return `${weeksAgo} weeks ago`;
    }
    else if (daysAgo >= 1) {
      return `${daysAgo} days ago`;
    }
    else if (hoursAgo >= 1) {
      return `${hoursAgo} hours ago`;
    }
    else if (minutesAgo >= 1) {
      return `${minutesAgo} minutes ago`;
    }
    else {
      return `${secondsAgo} seconds ago`;
    }
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
    <img class="user-image" src=${tweet.user.avatars} alt="User's avatar"></img>
    <div class="user-name">${tweet.user.name}</div>
    </div>
    <div class="user-handle">${tweet.user.handle}</div>
    </header>
    <div class="tweet-contents">${tweet.content.text}</div>
    <footer class="tweet-footer">
    <div class="tweet-date">${timeSince(tweet.created_at)}</div>
    <div class="tweet-buttons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `;

    return tweetHtml;
  }


  // TEST / DRIVER CODE (TEMP) --> Will eventually get this from the server
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };



  /**
   * Renders tweet elements in the DOM.
   * @param {array} tweetsArray an array of tweet objects to be rendered.
   */
  const renderTweets = function(tweetsArray) {
    tweetsArray.forEach(tweetObj => {
      // turn the tweet into HTML, then append to the page
      const $tweet = createTweetElement(tweetObj);
      console.log($tweet);
      $("#tweets-container").prepend($tweet);
    });
  };

  renderTweets([tweetData]); // TEST CODE



  /**
   * Fetches tweets from the /tweets page using a jQuery request.
   */
  const loadTweets = function() {
    console.log("Page loaded, fetching tweets by AJAX request...")
    $.ajax("/tweets/", {method: "GET"})
    .then(function(tweets) {
      console.log("SUCCESS!");
      console.log(tweets);
      renderTweets(tweets);
    });
  };

  loadTweets();

 });