import React, { useContext, useState, useEffect } from "react";
const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const storedValue = localStorage.getItem("iosUser");
  const [user, setUser] = useState(() => {
    if (storedValue != null && storedValue != "undefined")
      return JSON.parse(storedValue);
  });

  useEffect(() => {
    if (user) {
      const fun = async () => {
        try {
          const response = await fetch(
            import.meta.env.VITE_REACT_APP_backendURL + "/auth",
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          const res = await response.json();
          if (res.error) {
            setUser(null);
            localStorage.removeItem("iosUser", null);
          } else {
            setUser(res);
            localStorage.setItem("iosUser", JSON.stringify(res));
          }
        } catch (err) {
          console.error(err);
        }
      };

      fun();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
