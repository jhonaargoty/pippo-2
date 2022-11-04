import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import View from "./view";

function Index({ ganaderos, rutas, conductores }) {
  const notifySuccess = (message) => toast.success(message);
  const notifyWarning = (message) => toast.warning(message);
  const notifyError = () => toast.error("Error, intente de nuevo");
  const userLoggued = JSON.parse(localStorage.getItem("user"));

  const today = moment().format("YYYY-MM-DD");

  const conductorInfo = conductores?.filter(
    (c) => c.usuario === userLoggued[0].usuario
  )[0];

  const checkConnection = () => {
    if (navigator.onLine) {
      if (JSON.parse(localStorage.getItem("registro"))) {
        console.log(JSON.parse(localStorage.getItem("registro")));

        const existing = JSON.parse(localStorage.getItem("registro"));

        existing.map((item) => guardarDatos(item));

        localStorage.removeItem("registro");
      } else {
        console.log("no hay");
      }
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const guardarDatos = (dataSend) => {
    fetch("https://pippo-test.000webhostapp.com/api/registro/addRegistro.php", {
      method: "POST",
      body: JSON.stringify({
        item: dataSend,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          notifyError();
        } else {
          notifySuccess(`Se agrego el registro`);
          localStorage.removeItem("registro");
          /*  getListAllGanaderos();
       reset(); */
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    /* $conductor = $item["conductor"];
$fecha = $item["fecha"];
$ganadero = $item["ganadero"];
$ruta = $item["ruta"];
$litros = $item["litros"];
$precio = $item["precio"]; */

    const dataSend = {
      conductor: conductorInfo?.id,
      fecha: today,
      ganadero: ganaderoSelect,
      ruta: conductorInfo?.ruta,
      litros: litrosSelect,
      precio: ganaderos?.filter((item) => item.documento === ganaderoSelect)[0]
        ?.precio,
      total:
        ganaderos?.filter((item) => item.documento === ganaderoSelect)[0]
          ?.precio * litrosSelect,
    };

    if (navigator.onLine) {
      guardarDatos(dataSend);
    } else {
      notifyWarning("No hay internet, se guardará cuando exista conexión");

      const existing = JSON.parse(localStorage.getItem("registro"));

      let dataLocal = [];
      if (existing) {
        existing.push(dataSend);
        dataLocal = existing;
      } else {
        dataLocal = [dataSend];
      }

      localStorage.setItem("registro", JSON.stringify(dataLocal));
    }
  };

  const ganaderoSelect = watch("ganadero");
  const litrosSelect = watch("litros");

  const props = {
    ganaderos,
    conductorInfo,
    handleSubmit,
    onSubmit,
    register,
    ganaderoSelect,
    litrosSelect,
    isValid,
    rutas,
  };

  return <View {...props} />;
}

export default Index;
