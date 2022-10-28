import React, { useState } from "react";
import { FaHatCowboy, FaUserPlus } from "react-icons/fa";
import Header from "../header";
import { useForm } from "react-hook-form";
import "./styles.scss";

function View({ ganaderos }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [viewAdd, setViewAdd] = useState(false);

  const formAdd = [
    {
      label: "Documento",
      type: "text",
      ...register("documento"),
    },
    {
      label: "Teléfono",
      type: "number",
      ...register("telefono"),
      min: 0,
    },
    {
      label: "Nombre",
      type: "text",
      ...register("nombre"),
    },
    {
      label: "Dirección",
      type: "text",
      ...register("direccion"),
    },
    {
      label: "Promedio",
      type: "number",
      ...register("promedio"),
      min: 1,
    },
    {
      label: "Precio",
      type: "number",
      ...register("precio"),
      min: 1,
    },
  ];

  return (
    <div className="page ganaderos" id="full">
      <div className="header-page">
        <Header title="Ganaderos" icon={<FaHatCowboy />} />
      </div>

      <div className="content-page">
        <div className="add" onClick={() => setViewAdd(!viewAdd)}>
          <FaUserPlus />
          Agregar
        </div>

        {viewAdd && (
          <form onSubmit={handleSubmit(onSubmit)} className="formulario">
            {formAdd.map((item) => (
              <div className="formulario-item">
                <label>{item.label}:</label>
                <input {...item} />
              </div>
            ))}
            <div className="button">
              <input type="submit" value="Guardar" className="button-save" />
            </div>
          </form>
        )}
      </div>

      <div className="content-page">
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
    </div>
  );
}

export default View;
