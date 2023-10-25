import React, { useEffect, useState } from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Ganaderos from "./pages/ganaderos";
import Rutas from "./pages/rutas";
import Home from "./pages/home";
import Login from "./pages/login";
import Conductores from "./pages/conductores";
import Recolecciones from "./pages/recolecciones";
import Exportar from "./pages/exportar";
import { icons } from "./pages/icons";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaHatCowboy, FaRoute, FaStickyNote } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { RiFileExcel2Fill } from "react-icons/ri";
import axios from "axios";
import "./App.scss";
import MainHeader from "./MainHeader";
import { URL_BASE } from "./constants";
import moment from "moment";

function App() {
  const [userLoggued, setUserLoggued] = useState(null);
  const [viewMenu, setViewMenu] = useState(false);
  const [ganaderos, setGanaderos] = useState(null);
  const [conductores, setConductores] = useState(null);
  const [rutas, setRutas] = useState(null);
  const [recolecciones, setRecolecciones] = useState(null);

  const [login, setLogin] = useState(false);
  const [navi, setNav] = useState("Inicio");

  useEffect(() => {
    setUserLoggued(JSON.parse(localStorage.getItem("user")));
    setLogin(JSON.parse(localStorage.getItem("user")) && true);
  }, []);

  useEffect(() => {
    if (userLoggued) {
      getListAllGanaderos();
      getListAllConductores();
      getListAllRutas();
      getListAllRecolecciones();
    }
  }, [userLoggued]);

  const getListAllGanaderos = () => {
    axios.get(`${URL_BASE}/ganaderos/getListGanaderos.php`).then((response) => {
      setGanaderos(response.data);
    });
  };
  const getListAllConductores = () => {
    axios
      .get(`${URL_BASE}/conductores/getListConductores.php`)
      .then((response) => {
        setConductores(response.data);
      });
  };
  const getListAllRutas = () => {
    axios.get(`${URL_BASE}/rutas/getListRutas.php`).then((response) => {
      setRutas(response.data);
    });
  };
  const getListAllRecolecciones = async () => {
    const momentDate = moment();
    const formattedDate = momentDate.format("YYYY-MM-DD");

    axios
      .get(
        `${URL_BASE}/recolecciones/getRecolecciones.php?fecha=${formattedDate}`
      )
      .then((response) => {
        setRecolecciones(response.data);
      });
  };

  const navs = [
    {
      id: 1,
      name: "Inicio",
      path: "/",
      element: (
        <Home
          rutas={rutas}
          conductores={conductores}
          recolecciones={recolecciones}
          ganaderos={ganaderos}
        />
      ),
      icon: <AiFillHome />,
    },
    {
      id: 2,
      name: "Recolecciones",
      path: "/recolecciones",
      element: <Recolecciones recoleccionesInicial={recolecciones} />,
      icon: <FaStickyNote />,
    },
    {
      id: 3,
      name: "Ganaderos",
      path: "/ganaderos",
      element: (
        <Ganaderos
          getListAllGanaderos={getListAllGanaderos}
          ganaderos={ganaderos}
          rutas={rutas}
        />
      ),
      icon: <FaHatCowboy />,
    },
    {
      id: 4,
      name: "Rutas",
      path: "/rutas",
      element: (
        <Rutas
          getListAllRutas={getListAllRutas}
          rutas={rutas}
          ganaderos={ganaderos}
        />
      ),
      icon: <FaRoute />,
    },
    {
      id: 5,
      name: "Conductores",
      path: "/conductores",
      element: (
        <Conductores
          getListAllConductores={getListAllConductores}
          conductores={conductores}
          rutas={rutas}
        />
      ),
      icon: <ImTruck />,
    },
    {
      id: 6,
      name: "Exportar",
      path: "/exportar",
      element: <Exportar />,
      icon: <RiFileExcel2Fill />,
    },
  ];

  return (
    <div className="main-content">
      <HashRouter>
        {login ? (
          <>
            <div className={"menu movil-noview"}>
              <div className="img-logo">{icons("logo")}</div>

              <div className="menu-list">
                <div className="close-menu" onClick={() => setViewMenu(false)}>
                  <AiOutlineClose />
                </div>

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
              <MainHeader userLoggued={userLoggued} setLogin={setLogin} />
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
