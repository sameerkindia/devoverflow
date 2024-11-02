import React from "react";
import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <main>
      <UserButton afterSwitchSessionUrl="/" />
      <h1 className="h1-bold">Hello From Sameer</h1>
    </main>
  );
};

export default Home;
