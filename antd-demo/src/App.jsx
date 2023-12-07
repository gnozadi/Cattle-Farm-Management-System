import React from "react";

import  Navbar  from "./Navabr/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
