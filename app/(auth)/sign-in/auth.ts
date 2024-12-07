import React from "react";

import firebase from "../../../firebase/clientApp";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.githubprovider],
};

const auth = () => {};

export default auth;
