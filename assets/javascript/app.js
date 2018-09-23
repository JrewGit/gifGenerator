let apiKey = "RQS1OIvsf8cZjSyPeVF8O8zdhrblP7i6";
let topics = ["trucks", "motorcycles", "planes"];

for (let i = 0; i < topics.length; i++) {
    $("#buttonHolder").append(`<button id="${topics[i]}">${topics[i]}</button>`);
}

$("#userSubmit").click(function () {
    event.preventDefault();
    if ($("#userInput").val() !== "") {
        let newWord = $("#userInput").val().trim();
        topics.push(newWord);
        $("#buttonHolder").append(`<button id="${newWord}">${newWord}</button>`);
    };
    console.log(topics);
});

$(document).on("click","button",function () {

    let chosenWord = $(this).attr(`id`);

    console.log(chosenWord);

    let gif = `https://api.giphy.com/v1/gifs/search?q=${chosenWord}&api_key=${apiKey}&limit=10`;

    $.ajax({
        url: gif,
        method: "GET",
    }).then(function (response) {

        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
            
            $("#gifHolder").append(`<p>Rating: ${response.data[i].rating}</p>`)
            $("#gifHolder").append(`<img id="giphy${[i]}">`);
            $(`#giphy${[i]}`).attr("src", `${response.data[i].images.fixed_height_small.url}`)
        };

    });

});