import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        let res = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        if (search === "") return;
        setError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <>
      <h1>Api handling</h1>
      <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Something went wrong</p>
          ) : (
            <>
              <p>The length of products: {products.length}</p>
              <div>
                {products.map((product, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "yellow",
                    }}
                  >
                    <span>{index + 1}</span>
                    <span>{product.name}</span>
                    <span>{product.color}</span>
                    <span>{product.price}</span>
                    <span>--------------------</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;

// const customReactQuery = (url) => {
//   const [products, setProducts] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setError(false);
//         setLoading(true);
//         let res = await axios.get(url);
//         setProducts(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.log(`Error: ${error.message}`);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [search]);

//   return { products, loading, error };
// };
