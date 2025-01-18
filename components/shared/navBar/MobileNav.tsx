import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NavContent } from "./NavContent";
import SignOutButton from "../SignOutButton";
import { auth } from "@/auth";

const MobileNav = async () => {
  const session = await auth();

  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/hamburger.svg"
            width={36}
            height={36}
            alt="menu"
            className="invert-colors cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200 border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/images/site-logo.svg"
              width={23}
              height={23}
              alt="DevFlow"
            />
            <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
              Dev <span className="text-primary-500">Overflow</span>
            </p>
          </Link>

          <div className="overflow-y-auto">
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

{
  /* <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-full px-4 y-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-full px-4 y-3 shadow-none text-dark400_light900">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
    </SignedOut> */
}
