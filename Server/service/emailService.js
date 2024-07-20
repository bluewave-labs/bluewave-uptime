const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { compile } = require("handlebars");
const mjml2html = require("mjml");

/**
 * Represents an email service that can load templates, build, and send emails.
 */
class EmailService {
  /**
   * Constructs an instance of the EmailService, initializing template loaders and the email transporter.
   */
  constructor() {
    /**
     * Loads an email template from the filesystem.
     *
     * @param {string} templateName - The name of the template to load.
     * @returns {Function} A compiled template function that can be used to generate HTML email content.
     */
    this.loadTemplate = (templateName) => {
      const templatePath = path.join(
        __dirname,
        `../templates/${templateName}.mjml`
      );
      const templateContent = fs.readFileSync(templatePath, "utf8");
      return compile(templateContent);
    };

    /**
     * A lookup object to access preloaded email templates.
     * @type {Object.<string, Function>}
     * TODO  Load less used templates in their respective functions
     */
    this.templateLookup = {
      welcomeEmailTemplate: this.loadTemplate("welcomeEmail"),
      employeeActivationTemplate: this.loadTemplate("employeeActivation"),
      noIncidentsThisWeekTemplate: this.loadTemplate("noIncidentsThisWeek"),
      serverIsDownTemplate: this.loadTemplate("serverIsDown"),
      serverIsUpTemplate: this.loadTemplate("serverIsUp"),
      passwordResetTemplate: this.loadTemplate("passwordReset"),
    };

    /**
     * The email transporter used to send emails.
     * @type {Object}
     */
    this.transporter = nodemailer.createTransport({
      host: process.env.SYSTEM_EMAIL_HOST,
      port: process.env.SYSTEM_EMAIL_PORT,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SYSTEM_EMAIL_ADDRESS,
        pass: process.env.SYSTEM_EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Asynchronously builds and sends an email using a specified template and context.
   *
   * @param {string} template - The name of the template to use for the email body.
   * @param {Object} context - The data context to render the template with.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @returns {Promise<string>} A promise that resolves to the messageId of the sent email.
   */
  buildAndSendEmail = async (template, context, to, subject) => {
    const buildHtml = (template, context) => {
      const mjml = this.templateLookup[template](context);
      const html = mjml2html(mjml).html;
      return html;
    };

    const sendEmail = async (to, subject, html) => {
      const info = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: html,
      });
      return info;
    };
    const info = await sendEmail(to, subject, buildHtml(template, context));
    return info.messageId;
  };
}

module.exports = EmailService;
