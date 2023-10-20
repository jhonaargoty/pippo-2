import React, { useEffect, useState } from "react";

import View from "./view";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Index({ getListAllGanaderos, ganaderos, rutas }) {
  const notifySuccess = (message) => toast.success(`Se ${message} el ganadero`);
  const notifyError = () => toast.error("Error, intente de nuevo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [dataModal, setDataModal] = useState();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (dataModal?.type === "Modificar") {
      setValue("documento", dataModal?.documento);
      setValue("telefono", dataModal?.telefono);
      setValue("nombre", dataModal?.nombre);
      setValue(
        "ruta",
        rutas.find((ruta) => ruta.nombre === dataModal?.ruta)?.id
      );
      setValue("direccion", dataModal?.direccion);
      setValue("promedio", dataModal?.promedio);
      setValue("precio", dataModal?.precio);
    }
  }, [dataModal]);

  const add = (data) => {
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
          setIsModalOpen(false);
          notifySuccess("agrego");
          getListAllGanaderos();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const update = (data) => {
    fetch("https://pippo-test.000webhostapp.com/api/ganaderos/update.php", {
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
          setIsModalOpen(false);
          notifySuccess("modifico");
          getListAllGanaderos();
          reset();
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const onSubmit = (data) => {
    if (dataModal?.type === "Agregar") {
      add(data);
    } else {
      update(data);
    }
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
          setIsModalDeleteOpen(false);
        }
      })
      .catch((error) => {
        notifyError();
      });
  };

  const formAdd = [
    {
      label: "Documento",
      type: "text",
      ...register("documento", {
        required: true,
      }),
      disabled: dataModal?.type === "Modificar",
    },
    {
      label: "Teléfono",
      type: "number",
      ...register("telefono", {
        required: true,
      }),
      min: 0,
    },
    {
      label: "Nombre",
      type: "text",
      ...register("nombre", {
        required: true,
      }),
    },
    {
      label: "Ruta",
      type: "select",
      ...register("ruta", {
        required: true,
      }),
      options: rutas,
    },
    {
      label: "Dirección",
      type: "text",
      ...register("direccion", {
        required: true,
      }),
    },
    {
      label: "Promedio",
      type: "number",
      ...register("promedio", {
        required: true,
      }),
      min: 1,
    },
    {
      label: "Precio",
      type: "number",
      ...register("precio", {
        required: true,
      }),
      min: 1,
    },
  ];

  const props = {
    ganaderos,
    onSubmit,
    handleSubmit,
    register,
    isValid,
    deleteItem,
    setIsModalDeleteOpen,
    setIsModalOpen,
    isModalOpen,
    setDataModal,
    isModalDeleteOpen,
    dataModal,
    reset,
    formAdd,
  };

  return <View {...props} />;
}

export default Index;
