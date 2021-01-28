// CHARACTER COUNTER FOR THE ADD TWEET FORM'S TEXTAREA INPUT
/**
 * Count down the number of available characters left for a new tweet being composed.
 * >> Start the counter at 140 (max. characters) and decrease with each added character.
 * >> The counter should go into the negatives if more than 140 characters are composed.
 */


// Ensure DOM is loaded
$(document).ready(() => {

  // Register an event handler to the .new-tweet form textarea
  $("#tweet-text").on("input", function(event) {
    // `this` refers to element on which event triggered (event.target) -> unless arrow notation was used
    // Update the counter value based on length of this input
    // traverse the DOM tree from `this` to the counter --> do NOT just use `$('.counter')`
    const counter = $(this).siblings("div").children(".counter");
    counter.html(140 - this.value.length);

    // Check if counter is negative to toggle CSS class/appearance
    if (counter.html() < 0) {
      counter.toggleClass("count-negative", true);
    } else {
      counter.toggleClass("count-negative", false);
    }

    // **TODO: confirm whether this should return a value for testing, else, remove this line
    return counter.html();
  });

});