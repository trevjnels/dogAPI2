const imageRender = function(img) {
  $(".photoFlex").append(
    `<div class="photo"><img class="pho" src="${img}" alt="pic of a dog"><div>`
  );
};
const selectorBuilder = function(breeds) {
  breeds.forEach(breed => {
    $(".dogBreed").append(`<option value="${breed}">${breed}</option>`);
  });
};

const fetcher = function(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJSON => imageRender(responseJSON.message))
    .catch(e => console.log(e));
};
const breedFinder = function() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(returned => returned.message)
    .then(message => Object.keys(message))
    .then(keys => selectorBuilder(keys))
    .catch(e => console.log(e));
};

const getDogs = function(num, breed) {
  var img = "";
  if (num < 1 || num > 50) {
    alert("Please input a number between 1 & 50!!");
    num = 0;
  }
  for (let i = 0; i < num; i++) {
    fetcher(breed);
  }
};

const inputListener = function() {
  $(".dogForm").submit(function(event) {
    event.preventDefault();
    $(".photoFlex").html("");
    var numOfDogs = $(".dogNumber").val();
    var breed = $(".dogBreed").val();

    getDogs(numOfDogs, breed);
  });
};

breedFinder();
inputListener();
