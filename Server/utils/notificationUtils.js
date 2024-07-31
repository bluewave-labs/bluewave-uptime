const twilio = require('twilio');
const EmailService = require('../service/emailService');

// Need to take a deeper dive into this to better understand the service to see 
// if it suits our needs. 
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const emailService = new EmailService();

/**
 * Sends an email using the EmailService.
 * @async
 * @function
 * @param {string} to - The recipient's email address.
 * @param {string} template - The email template to use.
 * @param {object} context - The context data to populate the template.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
async function sendEmail(to, template, context) {
  const subject = 'Monitor Alert'; 
  await emailService.buildAndSendEmail(template, context, to, subject);
}

/**
 * Sends an SMS using the Twilio client.
 * @async
 * @function
 * @param {string} to - The recipient's phone number.
 * @param {string} message - The message body to send.
 * @returns {Promise<void>} - A promise that resolves when the SMS is sent.
 */
async function sendSMS(to, message) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
}

module.exports = { sendEmail, sendSMS };
