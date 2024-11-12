import React from "react";
import { SignIn } from "@clerk/nextjs";

// fallbackRedirectUrl="/"

const page = () => {
  return <SignIn />;
};

export default page;
