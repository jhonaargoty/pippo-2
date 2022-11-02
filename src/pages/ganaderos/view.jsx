import React, { useState } from "react";
import { FaHatCowboy, FaUserPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Header from "../header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

function View({
  ganaderos,
  onSubmit,
  handleSubmit,
  register,
  isValid,
  deleteItem,
}) {
  const [viewAdd, setViewAdd] = useState(false);

  const formAdd = [
    {
      label: "Documento",
      type: "text",
      ...register("documento", {
        required: true,
      }),
    },
    {
      label: "Teléfono",
      type: "number",
      ...register("telefono", {
        required: true,
      }),
      min: 0,
    },
    {
      label: "Nombre",
      type: "text",
      ...register("nombre", {
        required: true,
      }),
    },
    {
      label: "Dirección",
      type: "text",
      ...register("direccion", {
        required: true,
      }),
    },
    {
      label: "Promedio",
      type: "number",
      ...register("promedio", {
        required: true,
      }),
      min: 1,
    },
    {
      label: "Precio",
      type: "number",
      ...register("precio", {
        required: true,
      }),
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
            <div className="button-form">
              <input
                type="submit"
                value="Guardar"
                className="button"
                disabled={!isValid}
              />
            </div>
          </form>
        )}
      </div>

      <div className="content-page">
        <table className="tabla">
          <thead>
            <tr>
              <th scope="col">Documento</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Ruta</th>
              <th scope="col">Promedio</th>
              <th scope="col">Precio x Litro</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {ganaderos?.map((ganadero, index) => (
              <tr key={index}>
                <td data-label="documento">{ganadero.documento}</td>
                <td data-label="teléfono">{ganadero.telefono}</td>
                <td data-label="nombre">{ganadero.nombre}</td>
                <td data-label="dirección">{ganadero.direccion}</td>
                <td data-label="ruta">{ganadero.ruta}</td>
                <td data-label="promedio">{ganadero.promedio} lts</td>
                <td data-label="precio litro">$ {ganadero.precio}</td>
                <td className="actions">
                  <MdDeleteForever
                    onClick={() => {
                      deleteItem(ganadero.documento);
                    }}
                  />
                  <AiFillEdit />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer
          position="bottom-center"
          theme="colored"
          autoClose={5000}
        />
      </div>
    </div>
  );
}

export default View;
