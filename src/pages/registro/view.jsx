import React, { useState } from "react";
import { BsNodePlusFill } from "react-icons/bs";
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

  const ganaderoSelect = watch("ganadero");
  const litrosSelect = watch("litros");

  return (
    <div className="page registro" id="full">
      <div className="header-page">
        <Header title="Registro" icon={<BsNodePlusFill />} />
      </div>
      <div className="content-page">
        <h3>Ruta: Nombre ruta</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="formulario">
            <div>
              <label>Seleccione ganadero</label>
              <select {...register("ganadero")}>
                {ganaderos.map((item) => (
                  <option value={item.documento}>{item.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Litros recolectados</label>
              <input type="number" {...register("litros")} />
            </div>

            <div>
              <label htmlFor="">
                Precio Lt $
                {
                  ganaderos.filter(
                    (item) => item.documento === ganaderoSelect
                  )[0].precio
                }
              </label>
            </div>
            <div>
              <label htmlFor="">
                Precio Total $
                {ganaderos.filter(
                  (item) => item.documento === ganaderoSelect
                )[0].precio * litrosSelect}
              </label>
            </div>

            <input type="submit" value="Guardar" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default View;
