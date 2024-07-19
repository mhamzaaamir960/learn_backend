let abc = document.querySelector("h1");

let btn = document.querySelector("button");
let rst = document.querySelector("p");

btn.addEventListener("click", async() => {
  let fact = await getFacts();
  console.log(fact)
  rst.innerHTML = fact;
});


let url = "https://catfact.ninja/fact";

async function getFacts() {
  try {
    let res = await axios.get(url);
    console.log(res);
    return res.data.fact;
  } catch (e) {
    console.log(e);
    return e;
  }
}
