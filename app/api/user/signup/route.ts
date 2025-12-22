import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/src/models/userModal";
import { connection } from "@/src/dbConfig/dbConfig";
import { sendMail } from "@/src/utils/mailer";

connection();

export const Post = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, username, password } = reqBody;
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exist" },
        {
          status: 500,
        }
      );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendMail({ email, emailType: "Verify", userId: savedUser._id });

    //send email need to work
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json(
        { error: err?.message || "" },
        {
          status: 500,
        }
      );
  }
};
