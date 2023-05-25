import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export function createGroup(data) {

  const history = useHistory();

  let group = {
    name: data.name,
    description: data.description,
    drawDate: data.drawDate,
    eventDate: data.eventDate,
    image: data.image,
  };
  return group;
}

export async function sendGroup(group) {
  await axios
    //todo
    .post('https://localhost:7160/api/Users', group)

    .then(() => {
      history.push('/groupes');

    })
    .catch((err) => {
      console.log(err);

      try {
        setError(err.response.data);

      } catch (e) {
        setError(err.message);
      }

    });
}

function xsentUser(params) {
  axios
    .post("https://localhost:7160/login", user)
    .then((res) => {
      setError(null);
      sessionHandler.startSession(res.data);
    })
    .catch((err) => {
      console.log(err);
      try {
        setError(err.response.data);
      } catch (e) {
        setError(err.message);
      }
      sessionHandler.deleteSession();
    });
}

