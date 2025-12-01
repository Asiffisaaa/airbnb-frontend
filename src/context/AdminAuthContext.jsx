import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const adminlogin = (username) => {
    setAdmin({ username });
  };

  const adminlogout = () => {
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminlogin, adminlogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
