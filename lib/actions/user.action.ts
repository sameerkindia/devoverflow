"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongooes";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ _id : userId });

    return user;
  } catch (error) {
    console.log(error);

    return error;
  }
}

// CreateUserParams
export async function createUser(userData: any) {
  try {
    const session = await auth();
    connectToDatabase();

    const newUserData = {
      username: userData.username,
      name: session?.user?.name,
      email: session?.user?.email,
      picture: session?.user?.image,
    };
    const newUser = await User.create(newUserData);

    // return JSON.parse(JSON.stringify(newUser));

    redirect("/")
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function createUsername(email:any , username : any) {
//   try {
//     connectToDatabase();
//     const session = await auth()
//     // console.log(session?.user , "from server action")

//     // await User.findOneAndUpdate({ userId }, updateData, { new: true });
//     const user = await User.findOneAndUpdate({email : email}, {username : username} , {new : true})

//     // revalidatePath(path);
//     redirect("/")
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { userId, updateData, path } = params;

    const updatedUser = await User.findOneAndUpdate({ _id : userId }, updateData, { new: true });

    // console.log(updatedUser , "this is updated user")

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const userId = params;

    const user = await User.findOneAndDelete({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    // get user question ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams){
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if(searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') }},
        { username: { $regex: new RegExp(searchQuery, 'i') }},
      ]
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 }
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 }
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 }
        break;
    
      default:
        break;
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
    
  } catch (error) {
    throw error;
  }

}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if(!user) {
      throw new Error('User not found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if(isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(userId, 
        { $pull: { saved: questionId }},
        { new: true }
      )
    } else {
      // add question to saved
      await User.findByIdAndUpdate(userId, 
        { $addToSet: { saved: questionId }},
        { new: true }
      )
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { userId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;
    
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : { };

      let sortOptions = {};

      switch (filter) {
        case "most_recent":
          sortOptions = { createdAt: -1 }
          break;
        case "oldest":
          sortOptions = { createdAt: 1 }
          break;
        case "most_voted":
          sortOptions = { upvotes: -1 }
          break;
        case "most_viewed":
          sortOptions = { views: -1 }
          break;
        case "most_answered":
          sortOptions = { answers: -1 }
          break;
      
        default:
          break;
      }

    const user = await User
    .findOne({ _id : userId })
    .populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: 'tags', model: Tag , select: "_id name" },
        { path: 'author', model: User, select: '_id userId name picture'}
      ]
    })

    // console.log(user , "this is user from action.ts")

    const isNext = user.saved.length > pageSize;
    
    if(!user) {
      throw new Error('User not found');
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ _id: userId });

    if(!user) {
      throw new Error('User not found');
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id }},
      { $project: {
        _id: 0, upvotes: { $size: "$upvotes" }
      }},
      { $group: {
        _id: null,
        totalUpvotes: { $sum: "$upvotes" }
      }}
    ])

    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id }},
      { $project: {
        _id: 0, upvotes: { $size: "$upvotes" }
      }},
      { $group: {
        _id: null,
        totalUpvotes: { $sum: "$upvotes" }
      }}
    ])

    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id }},
      { $group: {
        _id: null,
        totalViews: { $sum: "$views" }
      }}
    ])

    const criteria = [
      { type: 'QUESTION_COUNT' as BadgeCriteriaType, count: totalQuestions },
      { type: 'ANSWER_COUNT' as BadgeCriteriaType, count: totalAnswers },
      { type: 'QUESTION_UPVOTES' as BadgeCriteriaType, count: questionUpvotes?.totalUpvotes || 0 },
      { type: 'ANSWER_UPVOTES' as BadgeCriteriaType, count: answerUpvotes?.totalUpvotes || 0 },
      { type: 'TOTAL_VIEWS' as BadgeCriteriaType, count: questionViews?.totalViews || 0 },
    ]

    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    }    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId})

    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1, })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('tags', '_id name')
      .populate('author', '_id name picture')

      const isNextQuestions = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId})

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('question', '_id title')
      .populate('author', '_id name picture')

      const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;
      
    return { totalAnswers, answers: userAnswers, isNextAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
