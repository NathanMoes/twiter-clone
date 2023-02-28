import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import NavBar from "./navbar";

const LoginPage: React.FC<{}> = ({}) => {
  const ctx = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginRequest = async () => {
    console.log(`username: ${userName}, password: ${password}`);
    const res = await fetch(`http://localhost:5000/user/${userName}`);
    const user = await res.json();
    console.log(
      `this is returned from fetch; user: ${user.name}, password: ${user.password}`
    );
    const form = document.getElementById("form-login");
    if (user.name === userName && user.password === password) {
      (form as HTMLFormElement).reset();
      ctx.loggin();
      window.alert("Logged in successfully");
      ctx.setUser(user.name);
    } else {
      window.alert("User name or password is incorrect");
    }
  };

  return (
    <IonPage>
      <NavBar>
        <IonTitle>Login Page</IonTitle>
      </NavBar>
      <IonContent>
        <IonGrid>
          <form id="form-login">
            <IonRow>
              <IonCol size="6" offset="3">
                <IonItem>
                  <IonInput
                    placeholder="Enter username"
                    type="text"
                    value={userName}
                    onIonChange={(ev: any): void => {
                      setUserName(ev.target.value);
                    }}
                  ></IonInput>
                </IonItem>
                {/* <IonButton onClick={ctx.loggin}>click me!</IonButton> */}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6" offset="3">
                <IonItem>
                  <IonInput
                    placeholder="password"
                    type="password"
                    value={password}
                    onIonChange={(ev: any): void => {
                      setPassword(ev.target.value);
                    }}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="2" offset="8">
                <IonButton onClick={loginRequest}>Submit</IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
