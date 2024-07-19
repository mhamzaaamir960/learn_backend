let url = "https://catfact.ninja/fact2";

async function getData() {
  try {
    let res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
    //   throw new Error("Something went wrong");
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}

getData();

// fetch(url)
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     console.log("data 1: ", res.fact);
//     return fetch(url);
//   })
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     console.log("data 2: ", res.fact);
//   })
//   .catch((e) => {
//     console.log("Error: ", e);
//   });
