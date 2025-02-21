"use client"
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <Suspense>
    <div className="flex-center gap-1">
      <Image src={imgUrl} alt="icon" width={20} height={20} />

      {href ? (
        <Link href={href} target="_blank" className="paragraph-medium text-blue-500">
          {title}
        </Link> 
      ) : (
        <p className="paragraph-medium text-dark400_light700">
          {title}
        </p>
      )}
    </div>
    </Suspense>
  )
}

export default ProfileLink