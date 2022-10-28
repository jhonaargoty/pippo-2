import React from "react";
import { BsNodePlusFill } from "react-icons/bs";
import Header from "../header";
import { useForm } from "react-hook-form";
import "./styles.scss";

function View() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
                <option value="ganadero1">ganadero1</option>
                <option value="ganadero2">ganadero2</option>
                <option value="ganadero3">ganadero3</option>
              </select>
            </div>

            <div>
              <label>Litros recolectados</label>
              <input type="number" {...register("litros")} />
            </div>

            <div>
              <label htmlFor="">Precio $123</label>
            </div>

            <input type="submit" value="Guardar" className="button-save" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default View;
