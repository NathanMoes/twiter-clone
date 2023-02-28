import { IonButton, IonCol, IonHeader, IonRow, IonToolbar } from "@ionic/react";
import { ReactElement, useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";

const NavBar: React.FC<{ children: React.ReactNode }> = ({
  children = null,
}): ReactElement => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar>
        <IonRow>
          <IonCol size="2">{children}</IonCol>
          <IonCol size="2" offset="6">
            {ctx.logedin ? (
              <IonButton
                onClick={() => {
                  ctx.loggin();
                }}
              >
                Logout
              </IonButton>
            ) : (
              <IonButton
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </IonButton>
            )}
          </IonCol>
          <IonCol size="2" className="pt-3">
            <NavLink id="profile" to="/profile">
              profile
            </NavLink>
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;
