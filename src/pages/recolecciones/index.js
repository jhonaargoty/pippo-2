import React, { useEffect, useState } from "react";

import View from "./view";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Index({ recolecciones }) {
  console.log("recolecciones", recolecciones);

  const props = {
    recolecciones,
  };
  return <View {...props} />;
}

export default Index;
