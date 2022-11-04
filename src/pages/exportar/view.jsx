import React, { useState } from "react";

import { RiFileExcel2Fill } from "react-icons/ri";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Header from "../header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import "./styles.scss";

function View({
  startDate,
  onChangeDate,
  endDate,
  getData,
  data,
  loading,
  getHeader,
  getData2,
}) {
  return (
    <div className="page exportar" id="full">
      <div className="header-page">
        <Header title="Exportar" icon={<RiFileExcel2Fill />} />
      </div>
      <div className="content-page">
        <div className="content-data">
          <h3>Seleccione fechas</h3>

          <div className="data-button">
            <DatePicker
              selected={startDate}
              onChange={onChangeDate}
              startDate={startDate}
              endDate={endDate}
              /*   excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]} */
              selectsRange
              selectsDisabledDaysInRange
              inline
            />
            <div className="dates-select">
              {startDate && (
                <div>{`Desde ${moment(startDate).format("YYYY-MM-DD")}`}</div>
              )}
              {endDate && (
                <div>{` - hasta ${moment(endDate).format("YYYY-MM-DD")}`}</div>
              )}
            </div>
          </div>
          <div
            className={
              startDate === null || endDate === null
                ? "button disabled"
                : "button"
            }
            onClick={() =>
              startDate === null || endDate === null ? {} : getData()
            }
          >
            {loading ? "Cargando..." : "Procesar datos"}
          </div>

          {data?.length >= 1 && (
            <CSVLink
              className="button download"
              data={data}
              headers={getHeader()}
              filename={"test3"}
              asyncOnClick={true}
            >
              <FaCloudDownloadAlt /> Descargar
            </CSVLink>
          )}
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
