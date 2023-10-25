import React from "react";
import { FaStickyNote, FaRegFrown, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import Header from "../header";

import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

function View({
  recolecciones,
  today,
  getListAllRecolecciones,
  tableTemplate,
  fechaSelect,
  isLoading,
}) {
  return (
    <div className="page recolecciones" id="full">
      <div className="header-page">
        <Header title="Recolecciones" icon={<FaStickyNote />}>
          <div className="select-fecha">
            <label className="select-fecha">Seleccione fecha:</label>
            <DatePicker
              selected={fechaSelect}
              onChange={(e) => getListAllRecolecciones(e)}
              maxDate={new Date()}
              showIcon={true}
            />
          </div>
        </Header>
      </div>

      <div className="content-page">
        {isLoading ? (
          <div className="no-data">
            <FaSearch />
            Buscando...
          </div>
        ) : recolecciones.length ? (
          <table className="tabla">
            <thead>
              <tr>
                {tableTemplate.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recolecciones?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td>{item?.fecha}</td>
                  <td>{item?.ruta}</td>
                  <td>{item?.ganadero}</td>
                  <td>{item?.conductor}</td>
                  <td>{item?.observaciones}</td>
                  <td>{item?.litros}</td>
                  <td>$ {item?.precio * item?.litros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <FaRegFrown />
            No hay datos para esta fecha
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
