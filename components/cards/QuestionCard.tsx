import Link from "next/link";
import React from "react";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import EditDeleteAction from "../shared/EditDeleteAction";
import { auth } from "@/auth";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: [{ _id: string; name: string; picture?: string }];
  upvotes: string[];
  views: number;
  answers: Array<Object>;
  createdAt: Date;
}

const QuestionCard = async ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {

  const session = await auth()

  // @ts-ignore
  const userId = session?.user?.id
  // @ts-ignore
  const showActionButtons = userId && JSON.stringify(userId) === JSON.stringify(author[0]._id);

  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1  flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            {" "}
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in */}
        {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
        )}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>

      <div className="flex flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author[0].name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author[0]._id}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes.length)}
          title="Votes"
          textStyle="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers.length)}
          title="Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title="views"
          textStyle="small-medium text-dark400_light800"
        />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
