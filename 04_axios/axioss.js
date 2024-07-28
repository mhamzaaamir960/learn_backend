// // let abc = document.querySelector("h1");

// // let btn = document.querySelector("button");
// // let rst = document.querySelector("p");

// // btn.addEventListener("click", async () => {
// //   let fact = await getFacts();
// //   console.log(fact);
// //   rst.innerHTML = fact;
// // });

// let url = "https://catfact.ninja/fact";

// // async function getFacts() {
// //   try {
// //     let res = await axios.get(url);
// //     console.log(res);
// //     return res.data.fact;
// //   } catch (e) {
// //     console.log(e);
// //     return e;
// //   }
// // }

// // function getData() {
// //   let res = fetch(url);

// //   res
// //     .then((res) => {
// //       // console.log(res);
// //       if (res.ok) {
// //         console.log(res.status);
// //       } else {
// //         throw new Error("Something went wrong!");
// //       }
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //     });
// // }

// // getData();

// // async function getData() {
// //   try {
// //     let res = await fetch(url);
// //     if (!res.ok) {
// //       throw new Error("Something went wrong!");
// //     }

// //     let data = await res.json();
// //     console.log(data.fact, ' and length is ',data.length);
// //   } catch (e) {
// //     console.log(e);
// //   }
// // }

// // getData();

// // async function getData() {
// //   try {
// //     const res = await fetch(url);

// //     // Check if the response status is OK (status code 200-299)
// //     if (!res.ok) {
// //       throw new Error(`HTTP error! Status: ${res.status}`);
// //     }

// //     const data = await res.json();
// //     console.log(data);

// //   } catch (err) {
// //     if (err instanceof SyntaxError) {
// //       console.log('Error parsing JSON:', err.message);
// //     } else if (err.name === 'TypeError') {
// //       console.log('Network error or resource not found:', err.message);
// //     } else {
// //       console.log('Unknown error:', err.message);
// //     }
// //   }
// // }

// // getData();

// let abc = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("successful");
//   }, 3000);
// });

// const data = async () => {
//   let $data = await abc;
//   console.log($data);
// };

// data();
