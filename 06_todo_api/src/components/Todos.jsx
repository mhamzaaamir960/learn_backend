import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todos.css";
import { Link } from "react-router-dom";

function Todos() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/todos?query=${search}`);
        setTodos(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/v1/todos/${_id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="container">
      <Link className="btn" to={"/addtodo"}>
        Add Todo
      </Link>

      <input
        type="search"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards">
          {todos &&
            todos.map((todo) => (
              <div key={todo._id} className="card">
                <span className="heading">{todo.title}</span>
                <p className="description">{todo.description}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${todo._id}`} className="btn">
                    Update
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
