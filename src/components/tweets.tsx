import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Edit from "./edit";
import NavBar from "./navbar";

export default function TweetList() {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const [tweets, setTweets] = useState([]);
  const Tweettest = (props: {
    tweet: { name: string; tweetText: string; likes: number; _id: number };
    deleteTweet: (number: number) => {};
  }) => (
    <IonRow className="d-flex bg-light rounded m-3">
      <IonCol size="1">{props.tweet.name}</IonCol>
      <IonCol size="8" className="py-5">
        <p className="text-center">{props.tweet.tweetText}</p>
      </IonCol>
      <IonCol size="3">
        <Link
          className="btn btn-link"
          to={`/edit/${props.tweet._id}`}
          onClick={() => {
            history.push(`/edit/${props.tweet._id}`);
          }}
        >
          Edit
        </Link>{" "}
        |
        <button
          className="btn btn-link"
          onClick={() => {
            props.deleteTweet(props.tweet._id);
          }}
        >
          Delete
        </button>
      </IonCol>
    </IonRow>
  );
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/tweets/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setTweets(records);
    }

    getRecords();

    return;
  }, [tweets.length]);

  // This method will delete a record
  async function deleteTweet(id: number) {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("deleted item");
      })
      .catch((err) => {
        console.error(err);
      });

    const newRecords = tweets.filter((el: { _id: number }) => el._id !== id);
    setTweets(newRecords);
  }

  // This method will map out the records on the table
  function tweetList() {
    return tweets.map(
      (tweet: {
        name: string;
        tweetText: string;
        likes: number;
        _id: number;
      }) => {
        return (
          <Tweettest
            tweet={tweet}
            deleteTweet={() => deleteTweet(tweet._id)}
            key={tweet._id}
          />
        );
      }
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <IonPage>
      <NavBar>
        <IonTitle>tweets</IonTitle>
      </NavBar>
      <IonHeader>
        <IonHeader className="px-5"></IonHeader>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonGrid className="mt-0">{tweetList()}</IonGrid>
      </IonContent>
    </IonPage>
  );
}
