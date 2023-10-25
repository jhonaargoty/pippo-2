import React from "react";
import "moment/locale/es";
import moment from "moment";
import { Routes, Route, Link, HashRouter, useNavigate } from "react-router-dom";
import {
  FaHatCowboy,
  FaRoute,
  FaUserCircle,
  FaPowerOff,
  FaStickyNote,
} from "react-icons/fa";
import { USERS } from "./constants";

function MainHeader({ userLoggued, setLogin }) {
  const navigate = useNavigate();
  moment.locale("es");
  const fechaActual = moment();
  const fechaFormateadaDia = fechaActual.format("dddd ");
  const fechaFormateada = fechaActual.format("D [de] MMMM [de] YYYY");

  return (
    <div className="main-header">
      <div className="last">
        <div className="fecha">
          <div className="fechadia">{fechaFormateadaDia}</div>
          <div>{fechaFormateada}</div>
        </div>
        <div className="user">
          <FaUserCircle />
          <div className="data">
            <span>{userLoggued?.usuario}</span>
            <span className="tipo">{USERS[userLoggued?.tipo]}</span>
          </div>
        </div>
        <Link to={"/"}>
          <div
            className="user-off"
            onClick={() => {
              setLogin(false);
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            <FaPowerOff />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MainHeader;