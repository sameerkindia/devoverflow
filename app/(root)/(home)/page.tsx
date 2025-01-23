import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestion } from "@/lib/actions/question.action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// const questions = [
//   {
//     _id: "1",
//     title:
//       "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
//     tags: [
//       { _id: "1", name: "javascript" },
//       { _id: "2", name: "react.js" },
//       { _id: "3", name: "invalid fields" },
//       { _id: "4", name: "salesforce" },
//     ],
//     author: { _id: "1", name: "Sameer" },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2024-03-01"),
//   },
//   {
//     _id: "2",
//     title:
//       "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
//     tags: [
//       { _id: "1", name: "javascript" },
//       { _id: "2", name: "react.js" },
//       { _id: "3", name: "invalid fields" },
//       { _id: "4", name: "salesforce" },
//     ],
//     author: { _id: "2", name: "Sameer khan" },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2024-05-08"),
//   },
//   {
//     _id: "3",
//     title:
//       "JavaScript validation for a form stops the form data from being submitted to mysql database",
//     tags: [
//       { _id: "1", name: "javascript" },
//       { _id: "2", name: "react.js" },
//       { _id: "3", name: "invalid fields" },
//       { _id: "4", name: "salesforce" },
//     ],
//     author: { _id: "3", name: "Sameer khan pali" },
//     upvotes: 10,
//     views: 55,
//     answers: [],
//     createdAt: new Date("2024-11-05"),
//   },
// ];

const Home = async () => {
  const result = await getQuestion({});

  const session = await auth()

  // @ts-ignore
  if (session && !session?.user?.username) {
    redirect('/update-info');
  }

  // console.log(session , "this is session from home page")

  // console.log(result.questions);
  // console.log(result.questions?.answers);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Question</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClass="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              key={question._id}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
