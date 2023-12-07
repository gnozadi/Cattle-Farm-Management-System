import React from "react";
import Login from "./Login/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
