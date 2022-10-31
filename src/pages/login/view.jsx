import React from "react";
import { icons } from "../icons";
import "./styles.scss";

function View({ setLogin }) {
  return (
    <div className="page login" id="full">
      <div className="login-content">
        <div className="login-content-logo">{icons("logo")}</div>
        <div className="login-content-text">
          <input type="text" name="" id="" />
          <input type="password" name="" id="" />
          <div className="button" onClick={() => setLogin(true)}>
            Aceptar
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
