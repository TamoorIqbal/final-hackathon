import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // create a transporter to send emails
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service: process.env.SMPT_SERVICE,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // set up email options
  const mailOptions = {
    from: `"MernLoginSignUp" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the email using the transporter
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
