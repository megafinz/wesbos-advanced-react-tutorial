import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello there!</h2>
      <p>${text}</p>
    </div>`;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const result = await transport.sendMail({
    to,
    from: 'reset-password@sick-fits.com',
    subject: 'Your password reset token!',
    html: makeEmail(`Your password reset token is here!

      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Click here to reset your password</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(
      `✉️ Message sent! Preview it at ${getTestMessageUrl(result).toString()}`
    );
  }
}
