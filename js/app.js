// Variables

const form = document.querySelector("#formulario");
const tweetsList = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners

eventListeners();

function eventListeners() {
  form.addEventListener("submit", handleSubmitAddTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);
    createHTML();
  });
}

// Functions

function handleSubmitAddTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;

  if (tweet === "") {
    showError("El mensaje no puede ir vacío");

    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetObj];

  createHTML();

  form.reset();
}

function showError(error) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = error;
  errorMessage.classList.add("error");

  const content = document.querySelector("#contenido");
  content.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
}

function createHTML() {
  cleanHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const removeBtn = document.createElement("a");
      removeBtn.classList.add("borrar-tweet");
      removeBtn.innerText = "X";

      removeBtn.onclick = () => {
        removeTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.innerText = tweet.tweet;
      tweetsList.appendChild(li);
      li.appendChild(removeBtn);
    });
  }

  syncLocalStorage();
}

function syncLocalStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function removeTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  createHTML();
}

function cleanHTML() {
  while (tweetsList.firstChild) {
    tweetsList.removeChild(tweetsList.firstChild);
  }
}
