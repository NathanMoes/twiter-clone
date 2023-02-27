import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    tweetText: "",
    likes: "",
    tweets: [],
  });
  const params = useParams();
  const navigate = useHistory();

  const fetchData = useCallback(async () => {
    const id = params.id.toString();

    const response = await fetch(
      `http://localhost:5000/tweet/${id.toString()}`,
      {
        method: "GET",
      }
    );
    console.log("Sad times");
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    if (!record) {
      window.alert(`Record with id ${id} not found`);
      navigate.push("/");
      return;
    }

    setForm(record);
  }, [navigate, params.id]);

  useEffect(() => {
    fetchData();
  }, [params.id, navigate, fetchData]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      tweetText: form.tweetText,
      likes: form.likes,
    };
    console.log(params.id);
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(JSON.stringify(editedPerson));
    navigate.push("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tweetText">tweetText: </label>
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
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
