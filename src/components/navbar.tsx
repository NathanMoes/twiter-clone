import { IonButton, IonCol, IonHeader, IonRow, IonToolbar } from "@ionic/react";
import { ReactElement, useContext } from "react";
import AuthContext from "../store/auth-context";

const NavBar: React.FC<{ children: React.ReactNode }> = ({
  children = null,
}): ReactElement => {
  const ctx = useContext(AuthContext);
  return (
    <IonHeader>
      <IonToolbar>
        <IonRow>
          <IonCol size="2">{children}</IonCol>
          <IonCol size="2" offset="8">
            <IonButton onClick={ctx.loggin}>click me!</IonButton>
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;
