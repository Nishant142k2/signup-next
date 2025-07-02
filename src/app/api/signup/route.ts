import { dbConnect } from "@/libs/dbConnect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    console.log("🔌 Connecting to DB...");
    await dbConnect();
    console.log("✅ DB Connected");

    const body: SignupData = await request.json();
    const { name, email, password } = body;
    console.log("📥 Received data:", { name, email });

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved");

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Internal Server Error:", err.message);
    } else {
      console.error("❌ Unknown error occurred");
    }
    return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 });
  }
}

