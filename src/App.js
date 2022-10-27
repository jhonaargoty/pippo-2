import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Ganaderos from "./pages/ganaderos";
import Rutas from "./pages/rutas";
import Home from "./pages/home";
import Conductores from "./pages/conductores";
import Registro from "./pages/registro";
import { icons } from "./pages/icons";
import "./App.scss";

function App() {
  const navs = [
    { id: 1, name: "Inicio", path: "/", element: <Home /> },
    { id: 2, name: "Ganaderos", path: "/ganaderos", element: <Ganaderos /> },
    { id: 3, name: "Rutas", path: "/rutas", element: <Rutas /> },
    {
      id: 4,
      name: "Conductores",
      path: "/conductores",
      element: <Conductores />,
    },
    { id: 5, name: "Registro", path: "/registro", element: <Registro /> },
  ];

  return (
    <div className="main-content">
      <BrowserRouter>
        <div className="menu">
          <div className="img-logo">{icons("logo")}</div>
          <div className="menu-list">
            {navs.map((nav) => {
              return (
                <Link key={nav.id} to={nav.path}>
                  <div className="menu-list-item">{nav.name}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <Routes>
          {navs.map((nav) => {
            return <Route key={nav.id} path={nav.path} element={nav.element} />;
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
