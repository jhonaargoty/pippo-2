import React, { useState } from "react";
import View from "./view";
import { toast } from "react-toastify";

function Index({ setLogin }) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const notifyError = () => toast.error("Error, datos invalidos");

  const login = () => {
    fetch("https://pippo-test.000webhostapp.com/api/login/login.php", {
      method: "POST",
      body: JSON.stringify({
        item: {
          user: user,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setLogin(true);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          notifyError();
        }
      });
  };

  const props = { user, setUser, password, setPassword, login };

  return <View {...props} />;
}

export default Index;
