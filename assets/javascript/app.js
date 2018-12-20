$(document).ready(function () {

    var topics = ["Running", "Tripping", "Falling", "Laughing", "Smiling", "Skipping", "Jumping", "Kicking", "Punching"];

    function renderButtons() {
        $("#topics-view").empty();

        //Loop through topics array
        for (var i = 0; i < topics.length; i++) {

            //Create buttons from topics in array
            var a = $("<button>");

            //Add topic-btn class
            a.addClass("topic-btn");

            //Add data-topic attribute to store search query
            a.attr("data-topic", topics[i]);

            //Button text
            a.text(topics[i]);

            //Append buttons to topics-view div
            $("#topics-view").append(a);
        }
    }

    $("#add-topic-btn").on("click", function (event) {
        event.preventDefault();

        //Take the user's input text...
        var topic = $("#topic-input").val().trim();

        // ...and add it to the array
        topics.push(topic);

        //clear text from input box
        $("#topic-form").get(0).reset();

        //Call renderButtons function
        renderButtons();
    })


    //Create function to show GIFs when topic-btn is pressed
    function displayGifs() {
        var topic = $(this).attr("data-topic");

        // Construct queryURL with topic input
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Create <div> for each GIF
                    var topicDiv = $("<div class='gif-div'>");

                    // Create image tag to display source GIF image
                    var topicImageStill = $("<img class='gif'>");
                    //var topicImageAnimate = $("<img class='gif'>");

                    // Create <p> to store GIF rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Set animated image source to img tag
                    //topicImageAnimate.attr("src", results[i].images.fixed_height.url);

                    // Set still image source
                    topicImageStill.attr("src", results[i].images.fixed_height_still.url);

                    // Append <p> and <img> to topicDiv <div>
                    topicDiv.append(topicImageStill);
                    topicDiv.append(p);

                    // Prepend topicDiv to "gifs-view" <div>
                    $("#gifs-view").prepend(topicDiv);
                    //$(".gif").on("click", function () {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                      //  var state = $(this).attr("data-state");


                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                        /*
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                        */
                    //})

                }
            });
    }
    //clears existing gifs from the #gifs-view div
    function clearGifs() {
        $("#gifs-view").empty();
    }

    //Call clearGif function
    $(document).on("click", ".topic-btn", clearGifs);

    //Call displayGif function
    $(document).on("click", ".topic-btn", displayGifs);

    //Call renderButtons function
    renderButtons();
})



