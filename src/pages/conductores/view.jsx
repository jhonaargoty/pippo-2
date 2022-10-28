import React from "react";
import { ImTruck } from "react-icons/im";
import Header from "../header";
import "./styles.scss";

function View({ conductores }) {
  return (
    <div className="page" id="full">
      <div className="header-page">
        <Header title="Conductores" icon={<ImTruck />} />
      </div>
      <div className="content-page">
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
    </div>
  );
}

export default View;
