let apiKey = "RQS1OIvsf8cZjSyPeVF8O8zdhrblP7i6";
let topics = ["tesla roadster", "mclaren p1", "audi r8", "lamborghini aventador", "ferrari laferrari", "koenigsegg agera", "hennessey venom"];

for (let i = 0; i < topics.length; i++) {
  $("#buttonHolder").append(`<button id="${topics[i]}">${topics[i]}</button>`);
}

$("#userSubmit").click(function (event) {

  event.preventDefault();
  if ($("#userInput").val() !== "") {
    let newWord = $("#userInput").val().trim();
    topics.push(newWord);
    $("#buttonHolder").append(`<button id="${newWord}">${newWord}</button>`);
  };
  $("#userInput").val("");

});

$(document).on("click", "button", function () {

  $("#gifHolder").empty();

  let chosenWord = $(this).attr(`id`);

  let gif = `https://api.giphy.com/v1/gifs/search?q=${chosenWord}&api_key=${apiKey}&limit=10`;

  $.ajax({
    url: gif,
    method: "GET",
  }).then(function (response) {

    console.log(response);

    for (let i = 0; i < response.data.length; i++) {

      $("#gifHolder").append(`<div class="pandgifHolder" id="pandgif${[i]}"></div>`)
      $(`#pandgif${[i]}`).append(`<p class="rtg">Rating: ${response.data[i].rating}</p>`)
      $(`#pandgif${[i]}`).append(`<img id="giphy${i}" value=${i}>`);
      $(`#giphy${i}`).attr("src", `${response.data[i].images.fixed_height_small_still.url}`)
      $(`#giphy${i}`).attr("state", `still`)

    };

    //Gave me the world of trouble because I originally had $(document).on instead.
    $("img").on("click", function () {

      numVal = $(this).attr('value');
      if ($(this).attr('state') === 'still') {
        $(this).attr(`src`, `${response.data[numVal].images.fixed_height_small.url}`);
        $(this).attr(`state`, `not-still`);
      } else if ($(this).attr('state') === 'not-still') {
        $(this).attr(`src`, `${response.data[numVal].images.fixed_height_small_still.url}`)
        $(this).attr(`state`, `still`);
      };

    })

  });

});