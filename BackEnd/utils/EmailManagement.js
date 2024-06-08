const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.EmailPassword,
  },
});

const sendBookingConfirmationEmail = (
  userEmail,
  username,
  court,
  time,
  bookingAt
) => {
  const mailOptions = {
    from: process.env.Email,
    to: userEmail,
    subject: "Badminton Court Booking Confirmation",
    text: `To ${username},

Your booking was successful! Here are the details:

Court: ${court}
Time: ${time}
Booked At: ${bookingAt}

Thank you for using our service!

Best regards,
Badminton Link`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const sendCancelBookingEmail = (
  userEmail,
  username,
  court,
  time,
  bookingAt
) => {
  const mailOptions = {
    from: process.env.Email,
    to: userEmail,
    subject: "Badminton Court Booking Cancellation",
    text: `To ${username},

Your booking at

Court: ${court}
Time: ${time}
Booked At: ${bookingAt}

has been canceled.
We hope to see you again soon.

Best regards,
Badminton Link`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

module.exports = { sendBookingConfirmationEmail, sendCancelBookingEmail };
