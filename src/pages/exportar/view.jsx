import React, { useState } from "react";

import { RiFileExcel2Fill } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Header from "../header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import JSZip from "jszip";
import saveAs from "save-as";
import { pdf } from "@react-pdf/renderer";
import PdfFacturaGanaderos from "./pdfFacturaGanaderos";

import "./styles.scss";

function View({
  startDate,
  onChangeDate,
  endDate,
  getData,
  data,
  loading,
  getHeader,
  getDateList,
}) {
  const today = moment().format("DD-MM-YYYY");

  const x = () => {
    const zip = new JSZip();

    data?.map((d, index) =>
      zip.file(
        `factura_${today}_${d.ganadero.replaceAll(" ", "_")}.pdf`,
        pdf(
          <PdfFacturaGanaderos
            d={d}
            desde={moment(startDate).format("YYYY-MM-DD")}
            hasta={moment(endDate).format("YYYY-MM-DD")}
            dateList={getDateList()}
          />
        ).toBlob()
      )
    );

    // once you finish adding all the pdf to the zip, return the zip file
    return zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(
        blob,
        `facturas${moment(startDate).format("YYYY-MM-DD")}_${moment(
          endDate
        ).format("YYYY-MM-DD")}.zip`
      );
    });
  };

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
            <>
              <CSVLink
                className="button download"
                data={data}
                headers={getHeader()}
                filename={"test3"}
                asyncOnClick={true}
              >
                <FaCloudDownloadAlt /> Descargar
              </CSVLink>
              <div className="button download" onClick={() => x()}>
                <AiFillPrinter /> Generar recibos
              </div>
            </>
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
