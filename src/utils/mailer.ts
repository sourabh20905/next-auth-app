import nodemailer from "nodemailer";

interface sendMailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendMail = async ({
  email,
  emailType,
  userId,
}: sendMailParams) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "sourabh20905@gmail.com",
      to: email,
      subject: emailType === "Verify" ? "Verify" : "Reset Password",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    };

    const mailResponse = await transporter.sendMail({
      ...mailOptions,
    });
    return mailResponse;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Something went wrong in nodemailer");
  }
};
