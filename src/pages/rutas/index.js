import React from "react";
import View from "./view";

function Index({ getListAllRutas, rutas }) {
  const props = {
    rutas,
  };
  return <View {...props} />;
}

export default Index;
