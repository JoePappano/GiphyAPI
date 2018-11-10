$(document).ready(function() {

//Variables
var topics = ["baseball", "football", "soccer", "tennis", "ping pong", "hockey", "basketball", "lacrosse", "golf", "cricket"]


// Function Declarations
function makeButtons() {
    for (i = 0; i < topics.length; i++) {
        newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.attr("class", "myButtons")
        newButton.attr("x", topics[i]);
        
        // newButton.attr("data-animate", )
        $("#buttonsGoHere").append(newButton);
    }
}

function newButtons() {
    $(".addButton").on("click", function(){
        if ($(".buttonValue").val()) {
            newSport = $("<button>");
            newSport.attr("x", ($(".buttonValue").val()));
            newSport.attr("class", "myButtons");
            newSport.text($(".buttonValue").val());
            $("#buttonsGoHere").append(newSport);
        }
    })
}






// Main Process

$(document).on("click", ".myButtons", function() {
    $("#gifs-appear-here").empty();
    var sport = $(this).attr("x");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=ftIC7XK037uJIsbqti08Y16pPWdhoRGO";
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (i = 0; i < results.length; i++) {
            sportsDiv = $("<div>");
            p = $("<p>");
            p.text("Rating: " + results[i].rating);
            sportsImage = $("<img>");
            sportsImage.addClass("yup");
            sportsImage.attr("src", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-animate", results[i].images.fixed_height.url);
            sportsImage.attr("data-still", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-state", "still");
            // newButton.attr("data-still", results[i].images.original_still.url);
            sportsDiv.append(p);
            sportsDiv.append(sportsImage);
            $("#gifs-appear-here").prepend(sportsDiv);
            console.log(response)
        }
    });
});

$(document).on("click", ".yup", function() {
    var state = $(this).attr("data-state");
    console.log(state)
    console.log(this)
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}); 



makeButtons();
newButtons();

})