import React from "react";
import { icons } from "../icons";
import "./styles.scss";

function View(/* { ganaderos } */) {
  const ganaderos = [
    {
      documento: 1030543123,
      telefono: 3128755945,
      nombre: "Isidro Lopez",
      direccion: "vereda 1 san miguel",
      promedio: 100,
      precio_x_lt: 200,
    },
    {
      documento: 98567354,
      telefono: 3128755944,
      nombre: "Pedro Rodriguez",
      direccion: "vereda 1 san miguel",
      promedio: 100,
      precio_x_lt: 200,
    },
    {
      documento: 87123908,
      telefono: 3128755943,
      nombre: "Manuel Diaz",
      direccion: "vereda 2 san miguel",
      promedio: 200,
      precio_x_lt: 300,
    },
    {
      documento: 1030616432,
      telefono: 3128755942,
      nombre: "Miguel Gutierrez",
      direccion: "vereda 3 san miguel",
      promedio: 300,
      precio_x_lt: 400,
    },
    {
      documento: 1040567432,
      telefono: 3128755941,
      nombre: "Juan Camilo Perez",
      direccion: "vereda 4 san miguel",
      promedio: 400,
      precio_x_lt: 500,
    },
  ];

  return (
    <div className="page" id="full">
      GANADEROS
      <table className="tabla">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Promedio</th>
            <th>Precio x Litro</th>
          </tr>
        </thead>
        <tbody>
          {ganaderos?.map((ganadero) => (
            <tr>
              <td>{ganadero.documento}</td>
              <td>{ganadero.telefono}</td>
              <td>{ganadero.nombre}</td>
              <td>{ganadero.direccion}</td>
              <td>{ganadero.promedio} lts</td>
              <td>$ {ganadero.precio_x_lt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default View;
