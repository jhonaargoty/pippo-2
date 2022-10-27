import React from "react";
import { icons } from "../icons";
import "./styles.scss";

function View({ conductores }) {
  return (
    <div className="page" id="full">
      <div className="header-page">Conductores</div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Ruta</th>
            <th>Placa</th>
          </tr>
        </thead>
        <tbody>
          {conductores?.map((ruta) => (
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
