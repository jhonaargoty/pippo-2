import React from "react";
import { icons } from "../icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import background from "../../assets/cowback.jpg";

function View({ user, setUser, password, setPassword, login, splash }) {
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="page login" id="full">
      {splash ? (
        <div className="cowback">
          <div className="cowback-content">
            {icons("logo")}
            <span class="loader"></span>
          </div>
        </div>
      ) : (
        <div className="login-content">
          <div className="login-content-logo">{icons("logo")}</div>
          <div className="login-content-text">
            <div className="label">Usuario:</div>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="label">Password:</div>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="button"
              onClick={() => login()}
              disabled={!user || !password}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={5000}
      />
    </div>
  );
}

export default View;
