import React, { useEffect, useState } from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Ganaderos from "./pages/ganaderos";
import Rutas from "./pages/rutas";
import Home from "./pages/home";
import Login from "./pages/login";
import Conductores from "./pages/conductores";
import Registro from "./pages/registro";
import { icons } from "./pages/icons";
import { AiFillHome } from "react-icons/ai";
import { FaHatCowboy, FaRoute, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { BsNodePlusFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import moment from "moment";
import axios from "axios";
import "./App.scss";

function App() {
  const today = moment().format("DD-MM-YYYY");

  const [viewMenu, setViewMenu] = useState(false);
  const [ganaderos, setGanaderos] = useState(null);

  useEffect(() => {
    getListAllGanaderos();
  }, []);

  const getListAllGanaderos = () => {
    axios
      .get("https://pippo-test.000webhostapp.com/api/ganaderos/getList.php")
      .then((response) => {
        setGanaderos(response.data);
      });
  };

  const navs = [
    {
      id: 1,
      name: "Inicio",
      path: "/",
      element: <Home />,
      icon: <AiFillHome />,
    },
    {
      id: 2,
      name: "Ganaderos",
      path: "/ganaderos",
      element: (
        <Ganaderos
          getListAllGanaderos={getListAllGanaderos}
          ganaderos={ganaderos}
        />
      ),
      icon: <FaHatCowboy />,
    },
    {
      id: 3,
      name: "Rutas",
      path: "/rutas",
      element: <Rutas />,
      icon: <FaRoute />,
    },
    {
      id: 4,
      name: "Conductores",
      path: "/conductores",
      element: <Conductores />,
      icon: <ImTruck />,
    },
    {
      id: 5,
      name: "Registro",
      path: "/registro",
      element: <Registro ganaderos={ganaderos} />,
      icon: <BsNodePlusFill />,
    },
  ];

  const [login, setLogin] = useState(false);
  const [navi, setNav] = useState("Inicio");

  return (
    <div className="main-content">
      <HashRouter>
        {login ? (
          <>
            <div className={`menu ${viewMenu ? "movil-view" : "movil-noview"}`}>
              <div className="img-logo">{icons("logo")}</div>
              <div className="menu-list">
                {navs.map((nav) => {
                  return (
                    <Link key={nav.id} to={nav.path}>
                      <div
                        className={`menu-list-item ${
                          navi === nav.name && "active"
                        } `}
                        onClick={() => {
                          setViewMenu(!viewMenu);
                          setNav(nav.name);
                        }}
                      >
                        {nav.icon}
                        {nav.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="main">
              <div className="movil img-logo">{icons("logo")}</div>
              <div className="main-header">
                <div
                  className="movil menu-movil"
                  onClick={() => setViewMenu(!viewMenu)}
                >
                  <TiThMenu />
                </div>

                <div className="last">
                  {today}
                  <div className="user">
                    <FaUserCircle />
                    <label>Jhonatan Argoty</label>
                  </div>
                  <Link to={"/"}>
                    <div className="user-off" onClick={() => setLogin(false)}>
                      <FaPowerOff />
                    </div>
                  </Link>
                </div>
              </div>
              <Routes>
                {navs.map((nav) => {
                  return (
                    <Route key={nav.id} path={nav.path} element={nav.element} />
                  );
                })}
              </Routes>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path={"/"} element={<Login setLogin={setLogin} />} />
            </Routes>
          </>
        )}
      </HashRouter>
    </div>
  );
}

export default App;
