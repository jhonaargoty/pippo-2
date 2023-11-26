import React, { useState } from "react";
import moment from "moment";
import View from "./view";
import { URL_BASE } from "../../constants";
import axios from "axios";
import { useContextoPippo } from "../../ContextoPippo";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

  console.log("recolecciones", recolecciones);

  const test = [
    {
      recoleccion_id: "390",
      conductor_id: "5",
      fecha: "2023-11-09",
      ganadero: "GONZALES CASAS LAURA JIMENA",
      ruta: "porvenir",
      litros: "200",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "48",
      ganadero_documento: "1020785422",
      precio: "2100",
      ruta_id: "1",
    },
    {
      recoleccion_id: "390-x",
      conductor_id: "5",
      fecha: "2023-11-10",
      ganadero: "GONZALES CASAS LAURA JIMENA",
      ruta: "porvenir",
      litros: "212",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "48",
      ganadero_documento: "1020785422",
      precio: "2150",
      ruta_id: "1",
    },
    {
      recoleccion_id: "390-x",
      conductor_id: "5",
      fecha: "2023-11-11",
      ganadero: "GONZALES CASAS LAURA JIMENA",
      ruta: "porvenir",
      litros: "312",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "48",
      ganadero_documento: "1020785422",
      precio: "2150",
      ruta_id: "1",
    },
    {
      recoleccion_id: "390-x",
      conductor_id: "5",
      fecha: "2023-11-12",
      ganadero: "GONZALES CASAS LAURA JIMENA",
      ruta: "porvenir",
      litros: "32",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "48",
      ganadero_documento: "1020785422",
      precio: "2150",
      ruta_id: "1",
    },
    {
      recoleccion_id: "391",
      conductor_id: "5",
      fecha: "2023-11-19",
      ganadero: "BAUTISTA LEON ALIRIO",
      ruta: "porvenir",
      litros: "10",
      observaciones: "X",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "47",
      ganadero_documento: "3056263",
      precio: "1900",
      ruta_id: "1",
    },
    {
      recoleccion_id: "392",
      conductor_id: "5",
      fecha: "2023-11-19",
      ganadero: "SANCHEZ AVELLANEDA ALDEMAR",
      ruta: "porvenir",
      litros: "10",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "45",
      ganadero_documento: "3056629",
      precio: "1900",
      ruta_id: "1",
    },
    {
      recoleccion_id: "393",
      conductor_id: "5",
      fecha: "2023-11-19",
      ganadero: "HERRERA GARZON IRMA NELLY",
      ruta: "porvenir",
      litros: "5",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "46",
      ganadero_documento: "20637926",
      precio: "2100",
      ruta_id: "1",
    },
    {
      recoleccion_id: "394",
      conductor_id: "5",
      fecha: "2023-11-20",
      ganadero: "VELASQUEZ ROJAS ANA DEL SALVADOR",
      ruta: "porvenir",
      litros: "10",
      observaciones: "",
      conductor: "Adrian",
      conductor_placas: "WGZ149",
      ganadero_id: "44",
      ganadero_documento: "20671799",
      precio: "2000",
      ruta_id: "1",
    },
  ];

  const generarPDF = () => {
    const doc = new jsPDF();

    const ganaderosData = {};
    test.forEach((item) => {
      const ganaderoId = item.ganadero_id;
      if (!ganaderosData[ganaderoId]) {
        ganaderosData[ganaderoId] = [];
      }
      ganaderosData[ganaderoId].push(item);
    });

    console.log("ganaderosData", ganaderosData);

    Object.keys(ganaderosData).forEach((ganaderoId, index) => {
      const ganaderoData = ganaderosData[ganaderoId];
      const ganaderoInfo = ganaderosData[ganaderoId][0];

      if (index > 0) {
        doc.addPage();
      }

      doc.text(
        `Documento equivalente a factura, (art3 dec.522 de 2003) No.: PLGUL`,
        10,
        20
      );
      doc.text(`ALIMENTOS PIPPO SAS`, 10, 30);
      doc.text(`NIT 900.031.833-6`, 10, 40);
      doc.text(`Responsable del IVA-Régimen Común`, 10, 50);

      doc.text(
        `Persona natural de quien se adquieren los bienes y/o servicios`,
        10,
        60
      );
      doc.text(`${ganaderoInfo.ganadero}`, 10, 70);
      doc.text(`Nit`, 10, 80);
      doc.text(`${ganaderoInfo.ganadero_documento}`, 10, 90);

      doc.text(`Ciudad y fecha de la operación`, 10, 100);
      doc.text(`Guasca Cuad. ${moment().format("DD/MM/YYYY")}`, 10, 110);

      const valorTotalQuincena = ganaderoData.reduce(
        (total, { litros, precio }) =>
          total + parseInt(litros * precio - (litros * precio * 0.75) / 100),
        0
      );

      const headers = [
        "Fecha",
        "Litros",
        "Valor Unitario",
        "Valor Total",
        "Descuento Fomento",
        "Valor Total Día",
      ];

      const rows = ganaderoData.map(({ fecha, litros, precio }) => [
        fecha,
        litros,
        precio,
        parseInt(litros * precio),
        parseInt((litros * precio * 0.75) / 100),
        parseInt(litros * precio - (litros * precio * 0.75) / 100),
        "",
      ]);

      rows.push(["", "", "", "", "TOTAL", valorTotalQuincena]);

      doc.autoTable({
        startY: 20,
        head: [headers],
        body: rows,
      });
    });

    doc.save("reporte.pdf");
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
    generarPDF,
  };

  return <View {...props} />;
}

export default Index;
