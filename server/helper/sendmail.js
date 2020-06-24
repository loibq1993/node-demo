const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  let msg = {
    to: email,
    from: 'loibq@scuti.asia',
    subject: 'Thank for joining in',
    text: `Welcome to the app, ${name}.`,
  }
  sgMail.send(msg);
}

module.exports = {sendWelcomeEmail};