import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({
  user: "",
  logedin: false,
  loggin: (): void => {},
  setUser: function name(params: any) {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: any }> = (
  props: any
) => {
  const [user, setUser] = useState("");
  const [logedin, setLogedin] = useState(false);

  const loggin = (): void => {
    setLogedin((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ user, logedin, loggin, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
