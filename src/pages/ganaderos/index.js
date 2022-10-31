import React, { useEffect, useState } from "react";

import View from "./view";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Index({ getListAllGanaderos, ganaderos }) {
  const notifySuccess = (message) => toast.success(`Se ${message} el ganadero`);
  const notifyError = () => toast.error("Error, intente de nuevo");

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    //getListAllGanaderos();
  }, []);

  const onSubmit = (data) => {
    /* let myJSON = {
      item: {
        ...data,
      },
    }; */
    fetch("https://pippo-test.000webhostapp.com/api/ganaderos/add.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          ...data,
        },
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          notifyError();
        } else {
          notifySuccess("agrego");
          getListAllGanaderos();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const deleteItem = (documento) => {
    fetch("https://pippo-test.000webhostapp.com/api/ganaderos/delete.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          documento: documento,
        },
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          notifyError();
        } else {
          notifySuccess("elimino");
          getListAllGanaderos();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const props = {
    ganaderos,
    onSubmit,
    handleSubmit,
    register,
    isValid,
    deleteItem,
  };

  return <View {...props} />;
}

export default Index;
