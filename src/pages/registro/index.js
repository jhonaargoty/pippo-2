import React from "react";
import View from "./view";

function Index({ ganaderos }) {
  const props = { ganaderos };

  return <View {...props} />;
}

export default Index;
