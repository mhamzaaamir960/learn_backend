// const axios = require('axios')

let $joke = document.querySelector("p");
let ln = document.querySelector(".length");
let btnn = document.querySelector(".btn");

btnn.addEventListener("click", async () => {
  let joke = await getJoke();
  $joke.innerHTML = `Joke: ${joke.fact}`;
  ln.innerHTML = `Length: ${joke.length}`;
  console.log(joke);
});

let url = "https://catfact.ninja/fact";

async function getJoke() {
  try {
    let res = await axios.get(url);
    if (res.data.code) {
      throw new Error(`${res.data.code}! not found`);
    }
    let data = res.data;
    return data;
  } catch (error) {
    console.log(
      `Error: ${error.response.status}! ${error.response.data.message}`
    );
    return error;
  }
}
