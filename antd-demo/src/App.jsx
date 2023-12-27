import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Account from "./Account/Account";
import ConfigPage from "./ConfigPage/ConfigPage";
import SessionManager from "./Auth/SessionManager";
import Banyard from "./Barnyard/Barnyard";
import Camera from "./Camera/camera";

const App = () =>
  SessionManager.getToken() ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/barnyards" element={<Banyard />} />
        <Route path="/cameras" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/barnyards" element={<Banyard />} />
        <Route path="/cameras" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
// </CookiesProvider>

export default App;
