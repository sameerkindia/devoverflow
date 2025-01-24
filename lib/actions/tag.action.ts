"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongooes";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [{_id: "1", name: "tag1"}, {_id: "2", name: "tag2"}, {_id: "3", name: "tag3"}];
  } catch (error) {
    throw error;
  }
}

// export async function teg(params: GetAllTagsParams){
//   try {
//     await connectToDatabase()

//   } catch (error) {
  //   throw error;
//   }
// }
