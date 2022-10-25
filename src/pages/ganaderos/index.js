import React, { useEffect, useState } from "react";
import axios from "axios";
import View from "./view";

function Index() {
  const baseURL = "http://localhost:3000/api/v1";
  const [ganaderos, setGanaderos] = useState(null);

  /*   useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGanaderos(response.data);
    });
  }, []);

  console.log("POST", ganaderos); */

  const props = { ganaderos };

  return <View {...props} />;
}

export default Index;
