const sgMail = require('@sendgrid/mail')
const logger = require('./logger')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const SERVICE_NAME = 'Email_Service';
/**
 * @async
 * @function
 * @param {[String]} receivers  - takes an array of strings
 * @param {String} subject - takes a single string
 * @param {String} contentHTML  - takes a single string that contains HTML
 * @param {String} contentText  - takes a string to be used if contentHTML is not compatible
 * @example
 * await sendEmail(['veysel@bluewavelabs.ca','alex@bluewavelabs.ca'],'Testing Email Service','<h1>BlueWaveLabs</h1>','Testing Email Service')
 */
const sendEmail = async (receivers,subject, contentHTML, contentText = null ) => {
    const msg = {
        to: receivers,
            from: {
                name: 'Uptime System',
                email: process.env.SYSTEM_EMAIL_ADDRESS // must be verified email by sendgrid
            }, 
        subject: subject,
        text: contentText || contentHTML,
        html: contentHTML,
    }
    try {
        await sgMail.send(msg);
        logger.info(`Emails sent to receivers:${receivers} with the subject:${subject}`,{service:SERVICE_NAME})
    } catch (error) {
        logger.error(`Sending Email action failed, ERROR:${error}`, { service: SERVICE_NAME });
    }
}



module.exports = {sendEmail}