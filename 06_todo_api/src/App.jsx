import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import "./App.css";
import Addtodo from "./components/Addtodo";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
      <Route path="/addtodo" element={<Addtodo />} />
      <Route path="/update/:id" element={<UpdateTodo />} />
    </Routes>
  );
}

export default App;
