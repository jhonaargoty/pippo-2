import React, { useState } from "react";
import moment from "moment";
import View from "./view";
import { URL_BASE } from "../../constants";
import axios from "axios";
import { useContextoPippo } from "../../ContextoPippo";

function Index() {
  const { rutas } = useContextoPippo();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [recolecciones, setRecolecciones] = useState([]);
  const [ruta, setRuta] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reporte, setReporte] = useState(1);

  console.log("ruta", ruta);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getData = async (fecha) => {
    setLoading(true);

    const fechaIni = moment(startDate).format("YYYY-MM-DD");
    const fechaFin = moment(endDate).format("YYYY-MM-DD");

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${URL_BASE}/recolecciones/getRecoleccionesByFecha.php?fechaIni=${fechaIni}&fechaFin=${fechaFin}&rutaId=${ruta}`
        );
        setRecolecciones(response.data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }

      setLoading(false);
    }, 1000);
  };

  const litrosAgrupados = recolecciones?.reduce((agrupados, item) => {
    const key = `${item.fecha}-${item.ganadero_id}`;
    if (!agrupados[key]) {
      agrupados[key] = {
        fecha: item.fecha,
        ganadero_id: item.ganadero_id,
        ganadero_documento: item.ganadero_documento,
        ganadero: item.ganadero,
        ruta: item.ruta,
        litros: 0,
      };
    }
    agrupados[key].litros += parseFloat(item.litros);
    return agrupados;
  }, {});

  const fechasUnicas = [...new Set(recolecciones?.map((item) => item.fecha))];

  const ganaderosUnicos = [
    ...new Set(recolecciones?.map((item) => item.ganadero_id)),
  ];

  const data = [];
  ganaderosUnicos?.forEach((ganaderoId) => {
    const totalPorGanadero = fechasUnicas?.map((fecha) =>
      litrosAgrupados[`${fecha}-${ganaderoId}`]
        ? litrosAgrupados[`${fecha}-${ganaderoId}`].litros
        : 0
    );

    const rowData = {
      Documento: recolecciones?.find((item) => item.ganadero_id === ganaderoId)
        ?.ganadero_documento,
      Ganadero: recolecciones?.find((item) => item.ganadero_id === ganaderoId)
        ?.ganadero,
      Ruta: recolecciones?.find((item) => item.ganadero_id === ganaderoId)
        ?.ruta,
      ...fechasUnicas?.reduce((acc, fecha, index) => {
        acc[fecha] = totalPorGanadero[index];
        return acc;
      }, {}),
      Total: totalPorGanadero.reduce((a, b) => a + b, 0),
    };
    data.push(rowData);
  });

  const dataAll = [];
  recolecciones?.forEach((item) => {
    const rowData = {
      recoleccion_id: item?.recoleccion_id,
      fecha: item?.fecha,
      ruta: item?.ruta,
      ganadero: item?.ganadero,
      conductor: item?.conductor,
      observaciones: item?.observaciones,
      litros: item?.litros,
      precio_total: `$${item?.precio * item?.litros}`,
    };

    dataAll.push(rowData);
  });

  const csvOptions = {
    filename: `tabla_reporte_${reporte}.csv`,
    separator: ";",
    data: reporte === 1 ? data : dataAll,
    uFEFF: true,
  };

  const props = {
    startDate,
    onChangeDate,
    endDate,
    getData,
    loading,
    rutas,
    setRuta,
    litrosAgrupados,
    recolecciones,
    fechasUnicas,
    ganaderosUnicos,
    csvOptions,
    reporte,
    setReporte,
  };

  return <View {...props} />;
}

export default Index;
