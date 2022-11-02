import React, { useState } from "react";
import { BsNodePlusFill } from "react-icons/bs";
import Header from "../header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.scss";

function View({
  ganaderos,
  conductorInfo,
  handleSubmit,
  onSubmit,
  register,
  ganaderoSelect,
  litrosSelect,
}) {
  return (
    <div className="page registro" id="full">
      <div className="header-page">
        <Header title="Registro" icon={<BsNodePlusFill />} />
      </div>
      <div className="content-page">
        <div className="content-form">
          <div>
            <h3>Ruta: {conductorInfo?.rutas}</h3>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="formulario">
                <div>
                  <label>Seleccione ganadero</label>
                  <select {...register("ganadero")}>
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {ganaderos?.map((item) => (
                      <option value={item.documento}>{item.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Litros recolectados</label>
                  <input type="number" {...register("litros")} />
                </div>

                <div>
                  <label htmlFor="" className="price-main">
                    <div>Precio Lt</div>
                    <div className="price">
                      ${" "}
                      {ganaderos?.filter(
                        (item) => item.documento === ganaderoSelect
                      )[0]?.precio || 0}
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="" className="price-main">
                    <div>Precio Total</div>
                    <div className="price">
                      {`$ 
                      ${
                        ganaderos?.filter(
                          (item) => item.documento === ganaderoSelect
                        )[0]?.precio * litrosSelect || 0
                      }`}
                    </div>
                  </label>
                </div>

                <input type="submit" value="Guardar" className="button" />
              </form>
            </div>
          </div>
        </div>
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
