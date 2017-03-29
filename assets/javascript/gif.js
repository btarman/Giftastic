var buttonDiv = $("#button-div");
var gifDiv = $("#gif-div");
var buttonItems = ["Eminem", "Jay-z", "Nas", "Kendrick Lamar", "Dr Dre", "Wu-Tang", "Kanye West"];
var rapperInput = $("#rapper-input");

for ( var i = 0; i < buttonItems.length; i++) {
	var button = $("<button>").text(buttonItems[i]).val(buttonItems[i]).addClass("rapper-btn");
	
	$(buttonDiv).append(button);


};

$("#add-rapper").click(function(event) {

		event.preventDefault()
		buttonItems.push(rapperInput.value);
		var button = $("<button>").text(rapperInput.val()).val(rapperInput.val()).addClass("rapper-btn");
		$(buttonDiv).append(button);
		$(button).click(function() {
			getGiphy(this.value)
		})

});

$('.rapper-btn').click(function() {
	getGiphy(this.value)
})

function getGiphy(rapper) {
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        rapper + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
       url: queryURL,
       method: "GET"
    })

    .done(function(response) {
    	console.log(response)
        var results = response.data;
        var rapperDivContainer = $("<div>");
        for( var i = 0; i<results.length; i++) {
        	var rapperDiv = $("<div>");
        	var p = $("<p>").text("Rating: " + results[i].rating);
        	var rapperImage = $("<img>");
        	rapperImage.attr("src", results[i].images.fixed_height_still.url);
        	rapperImage.attr("data-still", results[i].images.fixed_height_still.url);
        	rapperImage.attr("data-animate", results[i].images.fixed_height.url);
        	rapperImage.attr("data-state", "still");
        	rapperDiv.append(p);
        	rapperDiv.append(rapperImage);
        	rapperDivContainer.append(rapperDiv);

        }
        $("#gif-div").html(rapperDivContainer);

        $("img").click(function() {
      		var state = $(this).attr("data-state");

      		if (state === "still") {
        		$(this).attr("src", $(this).attr("data-animate"));
        		$(this).attr("data-state", "animate");
      		} else {
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
        	};

        })

    })

	// construct query string with rapper
	// make ajax call
}






