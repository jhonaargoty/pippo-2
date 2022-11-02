import React, { useEffect, useState } from "react";

import View from "./view";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Index({ getListAllConductores, conductores }) {
  const notifySuccess = (message) =>
    toast.success(`Se ${message} el conductor`);
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
    fetch("https://pippo-test.000webhostapp.com/api/conductores/add.php", {
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
          getListAllConductores();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const deleteItem = (documento) => {
    fetch("https://pippo-test.000webhostapp.com/api/conductores/delete.php", {
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
          getListAllConductores();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const props = {
    conductores,
    onSubmit,
    handleSubmit,
    register,
    isValid,
    deleteItem,
  };
  return <View {...props} />;
}

export default Index;
