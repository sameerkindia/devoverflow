// "use client";

import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  // const { userId } = await auth();

  const userId = "64c17f9c345678";

  // console.log(userId);

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log("mongo user ", mongoUser);

  if (!mongoUser) {
    return (
      <div>
        <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
        <div className="mt-9">No User Found</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default page;
