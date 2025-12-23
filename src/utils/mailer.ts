import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/userModal";

export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "Verify" | "Reset";
  userId: string;
}) => {
  const hashedToken = bcrypt.hashSync(userId, 10);

  if (emailType === "Verify") {
    await User.findOneAndUpdate(
      { email },
      {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      }
    );
  } else {
    await User.findOneAndUpdate(
      { email },
      {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "herman.wiegand@ethereal.email",
      pass: "FsmzhHUjhC8f8ZF944",
    },
  });

  const info = await transporter.sendMail({
    from: '"Auth App" <no-reply@authapp.com>',
    to: email,
    subject: emailType === "Verify" ? "Verify Email" : "Reset Password",
    html: `<p>Token: <b>${hashedToken}</b></p>`,
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

  return info;
};
