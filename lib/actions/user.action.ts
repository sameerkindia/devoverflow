"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongooes";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

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

//     // await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
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

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const clerkId = params;

    const user = await User.findOneAndDelete({ clerkId });

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

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
