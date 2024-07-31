const twilio = require('twilio');
const EmailService = require('../service/emailService');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const emailService = new EmailService();

async function sendEmail(to, template, context) {
  const subject = 'Monitor Alert'; 
  await emailService.buildAndSendEmail(template, context, to, subject);
}

async function sendSMS(to, message) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
}

module.exports = { sendEmail, sendSMS };
