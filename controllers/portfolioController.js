const nodemailer = require('nodemailer');

// Transporter setup with Elastic Email SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com', // Elastic Email SMTP server
  port: 587, // You can also try 465 (SSL) or 2525 (non-SSL)
  secure: false, // Set to true if you use SSL (port 465), else false for TLS (port 587)
  auth: {
    user: 'iamshayanjaved@gmail.com', // Your Elastic Email account email
    pass: process.env.API_ELASTIC, // API key or SMTP password from Elastic Email
  },
});

// SendEmailController handles the email sending logic
const SendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body; // Extracting values from the request body

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all fields',
      });
    }

    const message = {
      from: 'iamshayanjaved@gmail.com', // Sender email address
      to: 'iamshayanjaved@gmail.com', // Recipient email address
      subject: 'Regarding Mern Portfolio App', // Email subject
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${msg}`, // Plain text version of the message
      html: `  <!-- HTML version of the message -->
        <h5>Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // Sending the email using the transporter
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error while sending email:', error);
        return res.status(500).json({
          success: false,
          message: 'Error sending email',
          error: error.message,
        });
      } else {
        console.log('Email sent successfully:', info.response);
        return res.status(200).json({
          success: true,
          message: 'You should receive an email shortly!',
        });
      }
    });
  } catch (error) {
    console.log('Unexpected error in SendEmailController:', error);
    return res.status(500).json({
      success: false,
      message: 'Send Email API Error',
      error: error.message,
    });
  }
};

module.exports = { SendEmailController };
