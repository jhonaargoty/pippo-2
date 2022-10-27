import React from "react";
import { icons } from "../icons";
import "./styles.scss";

function View({ rutas }) {
  return (
    <div className="page" id="full">
      <div className="header-page">Rutas</div>
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
  );
}

export default View;
