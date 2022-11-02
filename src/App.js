import React, { useEffect, useState } from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Ganaderos from "./pages/ganaderos";
import Rutas from "./pages/rutas";
import Home from "./pages/home";
import Login from "./pages/login";
import Conductores from "./pages/conductores";
import Registro from "./pages/registro";
import Exportar from "./pages/exportar";
import { icons } from "./pages/icons";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { FaHatCowboy, FaRoute, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { RiFileExcel2Fill } from "react-icons/ri";
import { BsNodePlusFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import moment from "moment";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { USERS } from "./constants";
import "./App.scss";

function App() {
  const [userLoggued, setUserLoggued] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const notifySuccess = () => toast.success(`HAY INTERNET`);
  const notifyError = () => toast.error(`NO HAY INTERNET`);

  const checkConnection = () => {
    if (navigator.onLine) {
      notifySuccess();
      console.log("ok");
    } else {
      notifyError();
      console.log("pailas");
    }
  };
  //setTimeout(checkConnection, 5000);

  const today = moment().format("DD-MM-YYYY");

  const [viewMenu, setViewMenu] = useState(false);
  const [ganaderos, setGanaderos] = useState(null);
  const [conductores, setConductores] = useState(null);
  const [rutas, setRutas] = useState(null);

  useEffect(() => {
    getListAllGanaderos();
    getListAllConductores();
    getListAllRutas();
  }, []);

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
      element: <Rutas getListAllGanaderos={getListAllRutas} rutas={rutas} />,
      icon: <FaRoute />,
    },
    {
      id: 4,
      name: "Conductores",
      path: "/conductores",
      element: (
        <Conductores
          getListAllConductores={getListAllConductores}
          conductores={conductores}
        />
      ),
      icon: <ImTruck />,
    },
    {
      id: 5,
      name: "Registro",
      path: "/registro",
      element: (
        <Registro
          ganaderos={ganaderos}
          rutas={rutas}
          conductores={conductores}
        />
      ),
      icon: <BsNodePlusFill />,
    },
    {
      id: 5,
      name: "Exportar",
      path: "/exportar",
      element: <Exportar />,
      icon: <RiFileExcel2Fill />,
    },
  ];

  const [login, setLogin] = useState(false);
  const [navi, setNav] = useState("Inicio");

  console.log(userLoggued?.length);

  useEffect(() => {
    console.log("aqui");
    setUserLoggued(JSON.parse(localStorage.getItem("user")));
  }, [login]);

  return (
    <div className="main-content">
      <HashRouter>
        {userLoggued?.length >= 1 ? (
          <>
            <div className={`menu ${viewMenu ? "movil-view" : "movil-noview"}`}>
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
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={5000}
      />
    </div>
  );
}

export default App;
