import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Database } from "./pages/Database";
import { Users } from "./pages/Users";
import { Home } from "./pages/Home";
import { New } from "./pages/New";
import "./index.css";

// Componente principal da aplicação com tipagem em TypeScript
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registerUsers" element={<Register />} />
      <Route path="/viewDatabase" element={<Database />} />
      <Route path="/viewUsers" element={<Users />} />
      <Route path="/new" element={<New />} />
    </Routes>
  );
};

export default App;
