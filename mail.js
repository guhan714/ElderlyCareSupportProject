const sgMail = require("@sendgrid/mail");
const config = require("./config");
const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);
  const msg = {
    to: "srinivasanguhan30@gmail.com",
    from: "guhan000714@gmail.com",
    subject: "Test Email",
    text: "Hello lodukku, this is a test email from SendGrid! You have been registered to the Elderly Care Support management project. Your password is 234sdfcsdfa",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
