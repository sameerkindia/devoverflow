import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyle?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyle,
  isAuthor,
}: MetricProps) => {
  const matricContent = (
    <Suspense>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />

      <p className={`${textStyle} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </Suspense>
  );

  if (href) {
    return (
      <Suspense>
      <Link href={href} className="flex-center flex-wrap gap-1">
        {matricContent}
      </Link>
      </Suspense>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{matricContent}</div>;
};

export default Metric;
