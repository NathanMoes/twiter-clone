import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import NavBar from "./navbar";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    photo: "",
    password: "",
  });
  const navigate = useHistory();

  // These methods will update the state properties.
  function updateForm(value: {
    name?: string;
    photo?: string;
    password?: string;
  }) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    try {
      fetch("http://localhost:5000/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
        .then(() => {
          console.log("added tweet");
        })
        .catch((error) => {
          window.alert(error);
          return;
        });
    } catch (e) {
      console.error(e);
    }
    setForm({ name: "", photo: "", password: "" });
    navigate.push("/"); // note this seems to make an error
  }

  // This following section will display the form that takes the input from the user.
  return (
    <IonPage>
      <NavBar>
        <IonTitle>Tweet add</IonTitle>
      </NavBar>

      <IonContent>
        <div>
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">photo</label>
              <input
                type="text"
                className="form-control"
                id="photo"
                value={form.photo}
                onChange={(e) => updateForm({ photo: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="photo">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create user"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
