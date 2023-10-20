import React, { useEffect, useState } from "react";

import View from "./view";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Index({ getListAllRutas, rutas, ganaderos }) {
  const notifySuccess = (message) => toast.success(`Se ${message} la ruta`);
  const notifyError = () => toast.error("Error, intente de nuevo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalByGanaderos, setModalByGanaderos] = useState(false);
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
      setValue("nombre", dataModal?.nombre);
      setValue("direccion", dataModal?.direccion);
    }
  }, [dataModal]);

  const add = (data) => {
    fetch("https://pippo-test.000webhostapp.com/api/rutas/add.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          ...data,
        },
      }),
    }).then((response) => {
      if (response.status === 400) {
        notifyError();
      } else {
        setIsModalOpen(false);
        notifySuccess("agrego");
        getListAllRutas();
        reset();
      }
    });
  };

  console.log("data", dataModal);

  const update = (data) => {
    fetch("https://pippo-test.000webhostapp.com/api/rutas/update.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          id: dataModal?.id,
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
          getListAllRutas();
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

  const deleteItem = (id) => {
    fetch("https://pippo-test.000webhostapp.com/api/rutas/delete.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          id: id,
        },
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          notifyError();
        } else {
          notifySuccess("elimino");
          getListAllRutas();
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
      label: "Ruta",
      type: "text",
      ...register("nombre", {
        required: true,
      }),
    },
    {
      label: "Direccion",
      type: "text",
      ...register("direccion", {
        required: true,
      }),
    },
  ];

  const props = {
    rutas,
    deleteItem,
    setIsModalDeleteOpen,
    setIsModalOpen,
    isModalOpen,
    setDataModal,
    isModalDeleteOpen,
    dataModal,
    reset,
    formAdd,
    onSubmit,
    handleSubmit,
    isValid,
    modalByGanaderos,
    setModalByGanaderos,
    ganaderos,
  };
  return <View {...props} />;
}

export default Index;
