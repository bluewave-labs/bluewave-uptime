const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend')
const logger = require('../utils/logger')


const mailersend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
})
/**
 * @function
 * @param {[string]} receivers - takes an array of strings
 * @param {string} subject - takes a single string
 * @param {string} contentHTML - takes a single string that contains HTML
 * @returns {JSON}
 * @example 
 * sendEmail(['veysel@bluewavelabs.ca','alex@bluewavelabs.ca','monzer@bluewavelabs.ca'],'Testing Email Servide','<h1>BlueWaveLabs</h1>')
 */
// TODO: from email should be in .env file 
const sendEmail = async (receivers,subject,contentHTML) => {
    // Sender
    const from = process.env.SYSTEM_EMAIL_ADDRESS;
    const sender = new Sender(from);
    // receivers
    let recipients = []
    receivers.map(email => recipients.push(new Recipient(email)));
    // Set params
    const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo(recipients)
        .setSubject(subject)
        .setHtml(contentHTML);
    
    try {
        const response = await mailersend.email.send(emailParams);
        logger.info("Email sent to receivers!",{"service":"Email"})
        return response;

    } catch (error) {
        logger.error(error.body,{"service":"email"})
        console.log(error.body)
    }
}

module.exports = {sendEmail}