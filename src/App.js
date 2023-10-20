import React, { useEffect, useState } from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Ganaderos from "./pages/ganaderos";
import Rutas from "./pages/rutas";
import Home from "./pages/home";
import Login from "./pages/login";
import Conductores from "./pages/conductores";
import Recolecciones from "./pages/recolecciones";
import Registro from "./pages/registro";
import Exportar from "./pages/exportar";
import { icons } from "./pages/icons";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import {
  FaHatCowboy,
  FaRoute,
  FaUserCircle,
  FaPowerOff,
  FaStickyNote,
} from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { RiFileExcel2Fill } from "react-icons/ri";
import { BsNodePlusFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import moment from "moment";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { USERS } from "./constants";
import "moment/locale/es";
import "./App.scss";

function App() {
  const [userLoggued, setUserLoggued] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  moment.locale("es");

  const fechaActual = moment();

  const fechaFormateadaDia = fechaActual.format("dddd ");
  const fechaFormateada = fechaActual.format("D [de] MMMM [de] YYYY");

  const [viewMenu, setViewMenu] = useState(false);
  const [ganaderos, setGanaderos] = useState(null);
  const [conductores, setConductores] = useState(null);
  const [rutas, setRutas] = useState(null);
  const [recolecciones, setRecolecciones] = useState(null);

  useEffect(() => {
    getListAllGanaderos();
    getListAllConductores();
    getListAllRutas();
    getListAllRecolecciones();
  }, []);

  const getListAllRecolecciones = () => {
    axios
      .get(
        "https://pippo-test.000webhostapp.com/api/registro/getRecolecciones.php"
      )
      .then((response) => {
        setRecolecciones(response.data);
      });
  };
  const getListAllGanaderos = () => {
    axios
      .get(
        "https://pippo-test.000webhostapp.com/api/ganaderos/getListGanaderos.php"
      )
      .then((response) => {
        setGanaderos(response.data);
      });
  };
  const getListAllConductores = () => {
    axios
      .get(
        "https://pippo-test.000webhostapp.com/api/conductores/getListConductores.php"
      )
      .then((response) => {
        setConductores(response.data);
      });
  };
  const getListAllRutas = () => {
    axios
      .get("https://pippo-test.000webhostapp.com/api/rutas/getListRutas.php")
      .then((response) => {
        setRutas(response.data);
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
      name: "Recolecciones",
      path: "/recolecciones",
      element: <Recolecciones recolecciones={recolecciones} />,
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

  const [login, setLogin] = useState(false);
  const [navi, setNav] = useState("Inicio");

  useEffect(() => {
    setUserLoggued(JSON.parse(localStorage.getItem("user")));
  }, [login]);

  return (
    <div className="main-content">
      <HashRouter>
        {login && userLoggued?.length >= 1 ? (
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
              <div className="main-header">
                <div className="last">
                  <div className="fecha">
                    <div className="fechadia">{fechaFormateadaDia}</div>
                    <div>{fechaFormateada}</div>
                  </div>
                  <div className="user">
                    <FaUserCircle />
                    <div className="data">
                      <span>{userLoggued[0]?.usuario}</span>
                      <span className="tipo">
                        {USERS[userLoggued[0]?.tipo]}
                      </span>
                    </div>
                  </div>
                  <Link to={"/"}>
                    <div
                      className="user-off"
                      onClick={() => {
                        setLogin(false);
                        localStorage.removeItem("user");
                      }}
                    >
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
