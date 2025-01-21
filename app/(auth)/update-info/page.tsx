"use client";

import { auth } from "@/auth";
import AuthForm from "@/components/forms/AuthForm";
import { createUser} from "@/lib/actions/user.action";
import { SignInSchema, UsernameSchema } from "@/lib/validations";
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const page = () => {

  const route = useRouter()

  async function usernameUpdate(data:any){
    // console.log(data , "this is form data")

    // const session = await auth();

    // console.log(session , "this is from update user")

    // await createUsername( session?.user?.email , data.username);

    // await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           email: session?.user?.email,
    //           name: session?.user?.name,
    //           picture: session?.user?.image,
    //           username: data.username
    //         }),
    //       });

    await createUser(data);

    // redirect('/');

    // route.push("/")

    // return newUser
    // return JSON.parse(JSON.stringify(newUser));
  }

  return (
    <div>
      <AuthForm
        onSubmit={(data) => Promise.resolve(usernameUpdate(data))}
        formType="SIGN_IN"
        schema={UsernameSchema}
        defaultValues={{ username : '' }}
      />{" "}

      {/* <form action="mt-10 space-y-6">
        <div className="space-y-2 flex w-full flex-col gap-2.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 paragraph-medium text-dark400_light700">
            Username
          </label>
          <input
            type="text"
            className="flex h-9 w-full rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
            name="email"
            value=""
          />
        </div>

        <div className="space-y-2 flex w-full flex-col gap-2.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 paragraph-medium text-dark400_light700">
            Bio
          </label>
          <input
            type="text"
            className="flex h-9 w-full rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
            name="email"
            value=""
          />
        </div>

        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900">
          Sign In
        </button>
      </form> */}
    </div>
  );
};

export default page;
