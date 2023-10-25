import React, { useEffect, useState } from "react";
import moment from "moment";
import View from "./view";
import axios from "axios";
import { URL_BASE } from "../../constants";

function Index({ recoleccionesInicial }) {
  const [recolecciones, setRecolecciones] = useState([]);
  const [fechaSelect, setFechaSelect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();

  const getListAllRecolecciones = async (fecha) => {
    setFechaSelect(fecha);
    setIsLoading(true);

    const momentDate = moment(fecha);
    const formattedDate = momentDate.format("YYYY-MM-DD");

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${URL_BASE}/recolecciones/getRecolecciones.php?fecha=` +
            formattedDate
        );
        setRecolecciones(response.data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }

      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setFechaSelect(new Date());
    setRecolecciones(recoleccionesInicial);
  }, []);

  const tableTemplate = [
    "Id",
    "Fecha",
    "Ruta",
    "Ganadero",
    "Conductor",
    "Observaciones",
    "Litros",
    "Total",
  ];

  const props = {
    recolecciones,
    today,
    getListAllRecolecciones,
    tableTemplate,
    fechaSelect,
    isLoading,
  };
  return <View {...props} />;
}

export default Index;
