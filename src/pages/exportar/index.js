import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import View from "./view";

function Index({ ganaderos, rutas, conductores }) {
  const notifySuccess = (message) => toast.success(`Se ${message} el registro`);
  const notifyError = () => toast.error("Error, intente de nuevo");
  const userLoggued = JSON.parse(localStorage.getItem("user"));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [userData, setUserData] = useState([]);
  const [userData2, setUserData2] = useState([]);

  const getDateList = () => {
    let from = moment(startDate);
    let to = moment(endDate);

    var now = from.clone(),
      dates = [];

    while (now.isSameOrBefore(to)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }

    return dates;
  };

  const getHeader = () => {
    let headers = [
      { label: "Id", key: "idList" },
      { label: "conductor", key: "conductor" },
      { label: "ganadero", key: "ganadero" },
      { label: "ruta", key: "ruta" },
      { label: "precio", key: "precio" },
      { label: "documento", key: "documento" },
    ];

    getDateList()?.forEach((item, index) =>
      headers.push({ label: item, key: item.replaceAll("-", "") })
    );

    return headers;
  };

  function dedupe(list) {
    let idlist = 0;
    const arrayFilter = list.reduce((acc, current, index) => {
      const x = acc.find((item) => item.documento === current.documento);

      if (!x) {
        idlist++;
        acc.push({ idList: idlist, ...current });
      } else {
        Object.assign(x, current);
      }

      return acc;
    }, []);
    return arrayFilter;
  }

  useEffect(() => {
    let x = [];

    userData.forEach((item, index) => {
      let y = {
        ...item,
      };

      getDateList()?.forEach((date, index) => {
        if (item.fecha.replaceAll("-", "") === date.replaceAll("-", "")) {
          y[date.replaceAll("-", "")] = item.litros;
        }
      });

      x.push(y);
    });
    setUserData2(dedupe(x));
  }, [userData]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData2([]);
  }, [startDate, endDate]);

  const getData = () => {
    setUserData2([]);
    setLoading(true);

    fetch("https://pippo-test.000webhostapp.com/api/registro/getExport.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          fechaIni: moment(startDate).format("YYYY-MM-DD"),
          fechaFin: moment(endDate).format("YYYY-MM-DD"),
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserData(data);
          setLoading(false);
        } else {
          notifyError();
        }
      });
  };

  const props = {
    startDate,
    onChangeDate,
    endDate,
    getData,
    data: userData2,
    loading,
    getHeader,
  };

  return <View {...props} />;
}

export default Index;
