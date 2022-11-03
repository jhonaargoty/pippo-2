import React from "react";
import { FaRoute } from "react-icons/fa";
import Header from "../header";
import "./styles.scss";

function View({ rutas }) {
  return (
    <div className="page rutas" id="full">
      <div className="header-page">
        <Header title="Rutas" icon={<FaRoute />} />
      </div>
      <div className="content-page">
        <table className="tabla">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Direccion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rutas?.map((ruta) => (
              <tr>
                <td data-label="id">{ruta.id}</td>
                <td data-label="nombre">{ruta.nombre.toUpperCase()}</td>
                <td data-label="direccion">{ruta.dirección}</td>
                <td>x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
