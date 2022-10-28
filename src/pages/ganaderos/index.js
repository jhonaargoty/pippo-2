import React, { useEffect, useState } from "react";
import axios from "axios";
import View from "./view";

function Index() {
  const baseURL = "https://pippo-test.000webhostapp.com/database.php";
  const [ganaderos, setGanaderos] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log("RESPONSE", response);
      setGanaderos(response.data);
    });
  }, []);

  console.log("POST", ganaderos);

  const props = { ganaderos };

  return <View {...props} />;
}

export default Index;
