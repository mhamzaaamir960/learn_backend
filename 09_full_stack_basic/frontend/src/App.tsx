import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
interface JokesType {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [jokes, setJokes] = useState<JokesType[]>([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res: AxiosResponse<JokesType[]>) => {
        setJokes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <div className="container">
      <h1>Jokes for Programmers</h1>
      <p>Total Jokes: {jokes.length}</p>
      <div className="cards">
        {jokes.map((joke: JokesType) => (
          <div className="card" key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
