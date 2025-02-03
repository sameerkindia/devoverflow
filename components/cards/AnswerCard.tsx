import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
// import { SignedIn } from "@clerk/nextjs";
// import EditDeleteAction from "../shared/EditDeleteAction";
import { auth } from "@/auth";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = async ({
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {

  const session = await auth();
  // @ts-ignore
  const userId = session?.user.id
  const showActionButtons = userId && JSON.stringify(userId) === JSON.stringify(author._id);

  // console.log(userId , author._id , "this was shoe action btn")
  // console.log(showActionButtons , "this was shoe action btn")

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
        
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          textStyle="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
