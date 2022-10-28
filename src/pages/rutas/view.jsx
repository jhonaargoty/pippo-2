import React from "react";
import { FaRoute } from "react-icons/fa";
import Header from "../header";
import "./styles.scss";

function View({ rutas }) {
  return (
    <div className="page" id="full">
      <div className="header-page">
        <Header title="Rutas" icon={<FaRoute />} />
      </div>
      <div className="content-page">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            {rutas?.map((ruta) => (
              <tr>
                <td>{ruta.nombre}</td>
                <td>{ruta.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
