import React, { useState, useEffect } from "react";
import "./Todos.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateTodo() {
  const { id } = useParams();
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/api/v1/todos/${id}`);
        setData({
          title: data.data.title,
          description: data.data.description,
        });
        console.log(data);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dta = await axios.patch(`/api/v1/todos/${id}`, data);
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
          placeholder="Update Title"
        />
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Update description"
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit" className="btn">
            Update
          </button>
        )}
      </form>
    </div>
  );
}

export default UpdateTodo;
