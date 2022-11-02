import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { ImTruck } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Header from "../header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

function View({
  conductores,
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
      label: "Nombre",
      type: "text",
      ...register("nombre", {
        required: true,
      }),
    },
    {
      label: "Ruta",
      type: "text",
      ...register("ruta", {
        required: true,
      }),
    },
    {
      label: "Placa",
      type: "text",
      ...register("placa", {
        required: true,
      }),
    },
  ];
  return (
    <div className="page conductores" id="full">
      <div className="header-page">
        <Header title="Conductores" icon={<ImTruck />} />
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
              <th scope="col">Nombre</th>
              <th scope="col">Ruta</th>
              <th scope="col">Placa</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {conductores?.map((conductor) => (
              <tr>
                <td data-label="documento">{conductor?.documento}</td>
                <td data-label="nombre">{conductor?.nombre}</td>
                <td data-label="rutas">{conductor?.rutas}</td>
                <td data-label="placa">{conductor?.placa}</td>
                <td className="actions">
                  <MdDeleteForever
                    onClick={() => {
                      deleteItem(conductor.documento);
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
