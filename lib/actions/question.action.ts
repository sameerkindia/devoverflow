"use server";

import { connectToDatabase } from "../mongooes";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
