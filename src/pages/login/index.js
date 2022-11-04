import React, { useState, useEffect } from "react";
import View from "./view";
import { toast } from "react-toastify";

function Index({ setLogin }) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const notifyError = () => toast.error("Error, datos invalidos");
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setSplash(!splash);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const props = { user, setUser, password, setPassword, login, splash };

  return <View {...props} />;
}

export default Index;
