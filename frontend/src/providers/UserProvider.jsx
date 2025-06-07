import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const access = localStorage.getItem("access");

  if (access) {
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  }

  useEffect(() => {
    if (!access) {
      setLoading(false);
      return;
    }

    api.get("/api/user/me/")
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        localStorage.removeItem("access");
      })
      .finally(() => setLoading(false));
  }, [ access]);

  const login = async (username, password) => {
    const res = await api.post("/api/token/", { username, password });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    const userRes = await api.get("/api/user/me/");
    setUser(userRes.data);
  };

  return (
    <UserContext.Provider value={{ user, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);