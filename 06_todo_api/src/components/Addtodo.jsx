import React, { useState } from "react";
import "./Todos.css";
import axios from "axios";

function Addtodo() {
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dta = await axios.post("/api/v1/todos", data);
      if (!dta) {
        console.log("something went wrong");
      }
      console.log(dta);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      setData({ title: "", description: "" });
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit" className="btn">
            Add
          </button>
        )}
      </form>
    </div>
  );
}

export default Addtodo;
