const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: email,
//   from: EMAIL_FROM,
//   subject: "Testing send  the letter by SendGrid",
//   text: "Verify email!",
//   html: `<a target="_blank" href="http://localhost:3000/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
// };

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return true;
};

module.exports = sendEmail;
