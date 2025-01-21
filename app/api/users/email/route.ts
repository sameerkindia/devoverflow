import { auth } from "@/auth";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongooes";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req:any , res:any) {

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    await connectToDatabase()
    const user = await User.findOne({ email: email});

    if(!user) throw new Error("user not found")
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
  
}

export async function POST(request) {
  try {
    await connectToDatabase();

    // Parse the request body
    const { email, name } = await request.json();

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      // Insert the new user into the database
      const result = await User.create({ email, name });

      redirect("/");

      // return new Response(
      //   JSON.stringify({
      //     success: true,
      //     user: result, 
      //   }),
      //   { status: 201, headers: { "Content-Type": "application/json" } }
      // );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User already exists",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Database Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}