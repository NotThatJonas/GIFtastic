

// displayGIFInfo function re-renders the HTML to display the appropriate content
function displayGIF() {

    var GIF = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AMi65WXRhjYjmyAgtPrxmiw7fYcX5N8y&limit=10" + "&q=" + GIF;
    // var gifAmount = 5;

    console.log('url', queryURL);



    // Creating an AJAX call for the specific GIF button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log('response', response);

        
        for (var i = 0; i < 10; i++) {
            var GIFDiv = $("<div>").attr('class', 'gif-row');
            var rating = response.data[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            GIFDiv.append(pOne);
            var gifURL = response.data[i].images.fixed_height.url;
            var imgURL = response.data[i].images.fixed_height_still.url;
            var image = $("<img>").attr("src", imgURL).attr('class', 'GIF').attr('data-state', 'still').attr('data-still', imgURL).attr('data-animate', gifURL);

            GIFDiv.append(image);
            $("#GIF-view").prepend(GIFDiv);
        };

        // On click to toggle from motion to still
        
        $(".GIF").on("click", function () {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                console.log('state is still');
                var animatedSRC = $(this).attr('data-animate')
                $(this).attr('src', animatedSRC);
                $(this).attr("data-state", "animate");
            }

            else {
                var stillSRC = $(this).attr('data-still')
                console.log('state is animimate');
                $(this).attr('src', stillSRC);
                $(this).attr("data-state", "still");
            };

        });

    })


}

// Function for displaying GIF data
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < initialArray.length; i++) {

        var a = $("<button>");
        a.addClass("GIF-btn");
        a.attr("data-name", initialArray[i]);
        a.text(initialArray[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where a gif button is clicked
$("#add-GIF").on("click", function (event) {
    event.preventDefault();
    var GIFInput = $("#GIF-input").val().trim();
    initialArray.push(GIFInput);
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".GIF-btn", displayGIF);

// Calling the renderButtons function to display the intial buttons
renderButtons();



