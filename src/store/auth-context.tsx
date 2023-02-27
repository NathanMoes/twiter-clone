import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({
  user: null,
  logedin: false,
  loggin: (): void => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = (
  props: any
) => {
  const [user, setUser] = useState(null);
  const [logedin, setLogedin] = useState(false);

  const loggin = (): void => {
    setLogedin((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ user, logedin, loggin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
