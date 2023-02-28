import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import NavBar from "./navbar";

const Profile: React.FC<{}> = ({}) => {
  const ctx = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const getProfileData = useCallback(async () => {
    const res = await fetch(`http://localhost:5000/user/${ctx.user}`);
    const user = await res.json();
    setProfileImage(user.photo);
    setPassword(user.password);
    console.log(user);
  }, [ctx.user]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const updatePassword = async () => {
    const newUserData = {
      name: ctx.user,
      photo: profileImage,
      password: password,
    };
    await fetch(`http://localhost:5000/userupdate/${ctx.user}`, {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      window.alert("updated password");
    });
  };

  return (
    <IonPage>
      <NavBar>
        <IonTitle className="pt-2">Profile</IonTitle>
      </NavBar>
      <IonGrid>
        <IonRow>
          <IonCol size="12">{ctx.user}</IonCol>
          <IonCol size="12">
            <img src={profileImage.toString()} alt={`${ctx.user}'s pfp`} />
          </IonCol>
          <IonCol size="12">
            {changePassword ? (
              <IonInput
                placeholder="password"
                type="password"
                value={password}
                onIonChange={(ev: any): void => {
                  setPassword(ev.target.value);
                }}
              ></IonInput>
            ) : (
              " "
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          {" "}
          <IonCol size="12">
            <IonButton
              onClick={() => {
                setChangePassword((prev) => {
                  return !prev;
                });
              }}
            >
              Change password
            </IonButton>
            {changePassword ? (
              <IonButton onClick={updatePassword}>
                Submit new Password
              </IonButton>
            ) : (
              " "
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Profile;
