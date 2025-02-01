import React from "react";
import SignOutButton from "../SignOutButton";
import SideContent from "./SideContent";
import { auth } from "@/auth";
import Link from "next/link";

const LeftSideBar = async () => {
  const session = await auth();

  let userId: any;

  // @ts-ignore
  if(session)  userId = session.user.id;

  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      <div className="flex flex-1 flex-col gap-6">
        <SideContent userId={userId} />

        {session ? (
          <SignOutButton />
        ) : (
          <Link
            className="w-full rounded-lg text-light-900 flex items-center justify-center gap-4 p-4 bg-foreground"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;

{
  /* <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/login">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-full px-4 y-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-full px-4 y-3 shadow-none text-dark400_light900">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignOutButton /> */
}
