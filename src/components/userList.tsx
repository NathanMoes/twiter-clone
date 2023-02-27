import React, { ReactElement, useCallback, useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";

const UserList: React.FC<{}> = (): ReactElement => {
  const history = useHistory();
  const [usersList, setUsersList] =
    useState<{ name: string; photo: string; password: string }[]>();
  const getUsers = useCallback(async () => {
    const res = await fetch(`http://localhost:5000/users/`);
    if (!res.ok) {
      const errMSG = `An error has occured: ${res.statusText}`;
      window.alert(errMSG);
      return;
    }

    const users = await res.json();
    if (!users) {
      window.alert(`Error retriving users`);
      return;
    }
    setUsersList(users);
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const listUsers = () => {
    return usersList?.map((item) => {
      return (
        <>
          <IonRow>
            <IonCol size="4">{item.name}</IonCol>
            <IonCol size="4">
              <img src={item.photo} alt={`${item.name}'s img`}></img>
            </IonCol>
            <IonCol size="4">{item.password}</IonCol>
          </IonRow>
        </>
      );
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonHeader className="px-5">Tweets</IonHeader>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>{listUsers()}</IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserList;
// LoginOrProfileButton: React.FC<{}> = (): ReactElement => {
