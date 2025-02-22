import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestion, getRecommendedQuestions } from "@/lib/actions/question.action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import Question from "@/database/question.model";
// @ts-ignore
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar";



const Home = async ({searchParams}: SearchParamsProps) => {

  const session = await auth()

  // @ts-ignore
  if (session && !session?.user?.username) {
    redirect('/update-info');
  }

  let result;

  // @ts-ignore
  if(searchParams.filter === "recommended"){
    console.log("this is working")
    if(session) {
      console.log("this is working user")
      result = await getRecommendedQuestions({
        userId : session?.user?.id || '',
        // @ts-ignore
        searchQuery: searchParams?.q,
        // @ts-ignore
        page: searchParams?.page ? +searchParams?.page : 1,
      })
    }else{
      result={
        questions : [],
        isNext: false,
      }
    }
  } else{
    result = await getQuestion({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

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
        {/* <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        /> */}

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

      <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>

    </>
  );
};

export default Home;
