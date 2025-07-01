import { dbConnect } from "@/libs/dbConnect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("🔌 Connecting to DB...");
    await dbConnect();
    console.log("✅ DB Connected");

    const body = await request.json();
    const { name, email, password } = body;
    console.log(" Received data:", body);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    console.log(" Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(" Password hashed");

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log(" User saved");

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err: any) {
    console.error(" Internal Server Error:", err);  // <--- IMPORTANT
    return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 });
  }
}
