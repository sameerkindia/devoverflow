// "use client";

import { auth } from "@/auth";
import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

  const session = await auth()

  // @ts-ignore
  // const userId = "64c17f9c345678";
  const userId = session?.user.id;

  if (!session) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser , " this is user from ask question")

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
