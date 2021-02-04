/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Ensure that document is ready
$(document).ready(() => {

  /**
   * Scroll to and focus the new tweet form text input when 'write a new tweet' button is clicked.
   */
  $("#btn-compose-tweet").on("click", function() {
    $("#tweet-text").scrollTop();
    $("#tweet-text").focus();
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
      if (yearsAgo === 1) return `${yearsAgo} year ago`;
      return `${yearsAgo} years ago`;
    } else if (monthsAgo >= 1) {
      if (monthsAgo === 1) return `${monthsAgo} month ago`;
      return `${monthsAgo} months ago`;
    } else if (weeksAgo >= 1) {
      if (weeksAgo === 1) return `${weeksAgo} week ago`;
      return `${weeksAgo} weeks ago`;
    } else if (daysAgo >= 1) {
      if (daysAgo === 1) return `${daysAgo} day ago`;
      return `${daysAgo} days ago`;
    } else if (hoursAgo >= 1) {
      if (hoursAgo === 1) return `${hoursAgo} hour ago`;
      return `${hoursAgo} hours ago`;
    } else if (minutesAgo >= 1) {
      if (minutesAgo === 1) return `${minutesAgo} minute ago`;
      return `${minutesAgo} minutes ago`;
    } else if (secondsAgo >= 1) {
      if (secondsAgo === 1) return `${secondsAgo} second ago`;
      return `${secondsAgo} seconds ago`;
    } else {
      return "Just now";
    }
  };



  /**
   * Generates the tweets to be displayed on the page. Takes in a tweet object and returns a tweet article with the entire HTML structure of the tweet.
   * @param {object} tweet  The tweet object to be transformed into HTML.
   * @return {string} The tweet in HTML structure for display on the page.
   */
  const createTweetElement = function(tweet) {
    // turn tweet data into an HTML tweet element/article
    // use .text() to prevent XSS code injection from user input
    const tweetHtml =
      $("<article/>", {"class": "tweet"})
        .append($("<header/>", {"class": "tweet-header"})
          .append($("<div>", {"class": "tweet-user"})
            .append($("<img/>", {"class": "user-image", "src": `${tweet.user.avatars}`, "alt": "User's avatar"}))
            .append($("<div/>", {"class": "user-name"}).text(tweet.user.name)))
          .append($("<div/>", {"class": "user-handle"}).text(tweet.user.handle)))
        .append($("<div/>", {"class": "tweet-content"}).text(tweet.content.text))
        .append($("<footer/>", {"class": "tweet-footer"})
          .append($("<div>", {"class": "tweet-date"}).text(timeSince(tweet.created_at)))
          .append($("<div/>", {"class": "tweet-buttons"})
            .append($("<i/>", {"class": "fas fa-flag"}))
            .append($("<i/>", {"class": "fas fa-retweet"}))
            .append($("<i/>", {"class": "fas fa-heart"}))
          )
        );
    return tweetHtml;
  };



  /**
    * Renders tweet elements in the DOM.
    * @param {array} tweetsArray an array of tweet objects to be rendered.
    */
  const renderTweets = function(tweetsArray) {
    tweetsArray.forEach(tweetObj => {
      // turn the tweet into HTML, then append to the page
      const $tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend($tweet);
    });
  };



  /**
   * Fetches tweets from the /tweets page using a jQuery request.
   */
  const loadTweets = function() {
    console.log("Fetching tweets from the server...");
    $.ajax("/tweets/", {method: "GET"})
      .then(function(tweets) {
        console.log("Success...Rendering tweets...");
        renderTweets(tweets);
      });
  };
  loadTweets();


  /**
   * Asynchronous AJAX POST request to send new tweet form data to the server.
   * Validates form input then sends to server, and reloads/fetches all tweets.
   */
  $(function() {
    $("#new-tweet-form").submit(function(event) {
      event.preventDefault();

      // validate tweet text is 1-140 characters (not only spaces)
      const tweetText = $(this).children("#tweet-text").val();
      // hide any past error message
      $("#error-msg-1, #error-msg-2").slideUp();
      $("#error-msg-1, #error-msg-2").removeClass("show-error");
      // show error message if invalid input/tweet text
      if (!tweetText || !tweetText.trim()) {
        $("#error-msg-1").addClass("show-error");
        return $("#error-msg-1").slideDown();
      } else if (tweetText.length > 140) {
        $("#error-msg-2").addClass("show-error");
        return $("#error-msg-2").slideDown();
      } else {
        $("#error-msg-1, #error-msg-2").slideUp();
        $("#error-msg-1, #error-msg-2").removeClass("show-error");
      }

      // perform an AJAX POST request, sending the serialized form data to the server
      console.log("Tweet button clicked, performing ajax call...");
      $.ajax("/tweets/", {
        method: "POST",
        data: $(this).serialize()
      })
        // Request success handler
        .then(function() {
          console.log("AJAX POST request complete");
          // clear/reset the form, then reload tweets
          $(":input", "#new-tweet-form")
            .val("");
          $("#char-counter").val("140");
          loadTweets();
        });
    });
  });
});