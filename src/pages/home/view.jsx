import React from "react";
import { AiFillHome } from "react-icons/ai";
import Header from "../header";

import moment from "moment";

import "./styles.scss";

function View() {
  return (
    <div className="page home" id="full">
      <div className="header-page">
        <Header title="Inicio" icon={<AiFillHome />} />
      </div>
    </div>
  );
}

export default View;
