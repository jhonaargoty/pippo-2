import React from "react";
import { FaStickyNote } from "react-icons/fa";

import Header from "../header";

import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

function View({ recolecciones }) {
  const tableTemplate = [
    "Id",
    "Fecha",
    "Ruta",
    "Ganadero",
    "Conductor",
    "Litros",
    "Observaciones",
    "Total",
  ];

  return (
    <div className="page conductores" id="full">
      <div className="header-page">
        <Header title="Recolecciones" icon={<FaStickyNote />} />
      </div>

      <div className="content-page">
        <table className="tabla">
          <thead>
            <tr>
              {tableTemplate.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recolecciones?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.fecha}</td>
                <td>{item?.ruta}</td>
                <td>{item?.ganadero}</td>
                <td>{item?.conductor}</td>
                <td>{item?.litros}</td>
                <td>{item?.observaciones}</td>
                <td>$ {item?.precio * item?.litros}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
