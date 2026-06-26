import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Stock Management Support" <${process.env.EMAIL_USER}>`,
    to:["hadyafardin@gmail.com", "tech.yadgar@gmail.com"],
    subject,
    html,
  });
};