import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

export default function CreateTweet() {
  const [form, setForm] = useState({
    name: "",
    tweetText: "",
    likes: "",
  });
  const navigate = useHistory();

  // These methods will update the state properties.
  function updateForm(value: {
    name?: string;
    tweetText?: string;
    likes?: string;
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
      fetch("http://localhost:5000/tweet/add", {
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
    setForm({ name: "", tweetText: "", likes: "" });
    navigate.push("/"); // note this seems to make an error
  }

  // This following section will display the form that takes the input from the user.
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tweet add</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h3>Create New Record</h3>
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
              <label htmlFor="tweetText">tweetText</label>
              <input
                type="text"
                className="form-control"
                id="tweetText"
                value={form.tweetText}
                onChange={(e) => updateForm({ tweetText: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create tweet"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
