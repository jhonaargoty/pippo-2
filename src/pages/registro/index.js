import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";
import View from "./view";

function Index({ ganaderos, rutas, conductores }) {
  const notifySuccess = (message) => toast.success(`Se ${message} el registro`);
  const notifyError = () => toast.error("Error, intente de nuevo");
  const userLoggued = JSON.parse(localStorage.getItem("user"));

  const today = moment().format("YYYY-MM-DD");

  const conductorInfo = conductores?.filter(
    (c) => c.usuario === userLoggued[0].usuario
  )[0];

  /* const checkConnection = () => {
    if (navigator.onLine) {
      console.log("ok");
    } else {
      console.log("pailas");
    }
  };
  setTimeout(checkConnection, 5000);
 */
  console.log(conductorInfo);

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
          notifySuccess("agrego");
          /*  getListAllGanaderos();
       reset(); */
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
      localStorage.setItem("registro", JSON.stringify(dataSend));
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
  };

  return <View {...props} />;
}

export default Index;
