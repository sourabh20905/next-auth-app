import { connection } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModal";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connection();
    const users = User.find();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
