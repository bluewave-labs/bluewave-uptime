const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { compile } = require("handlebars");
const mjml2html = require("mjml");
const SERVICE_NAME = "EmailService";
const logger = require("../utils/logger");

/**
 * Represents an email service that can load templates, build, and send emails.
 */
class EmailService {
  /**
   * Constructs an instance of the EmailService, initializing template loaders and the email transporter.
   */
  constructor(settingsService) {
    this.settingsService = settingsService;
    /**
     * Loads an email template from the filesystem.
     *
     * @param {string} templateName - The name of the template to load.
     * @returns {Function} A compiled template function that can be used to generate HTML email content.
     */
    this.loadTemplate = (templateName) => {
      try {
        const templatePath = path.join(
          __dirname,
          `../templates/${templateName}.mjml`
        );
        const templateContent = fs.readFileSync(templatePath, "utf8");
        return compile(templateContent);
      } catch (error) {
        logger.error("Error loading Email templates", {
          error,
          service: this.SERVICE_NAME,
        });
      }
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

    const {
      systemEmailHost,
      systemEmailPort,
      systemEmailAddress,
      systemEmailPassword,
    } = this.settingsService.getSettings();

    const emailConfig = {
      host: systemEmailHost,
      port: systemEmailPort,
      secure: true,
      auth: {
        user: systemEmailAddress,
        pass: systemEmailPassword,
      },
    };
    console.log(emailConfig);

    this.transporter = nodemailer.createTransport(emailConfig);
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
    const buildHtml = async (template, context) => {
      try {
        const mjml = this.templateLookup[template](context);
        const html = await mjml2html(mjml);
        return html.html;
      } catch (error) {
        logger.error("Error building Email HTML", {
          error,
          service: SERVICE_NAME,
        });
      }
    };

    const sendEmail = async (to, subject, html) => {
      try {
        const info = await this.transporter.sendMail({
          to: to,
          subject: subject,
          html: html,
        });
        return info;
      } catch (error) {
        logger.error("Error sending Email", {
          error,
          service: SERVICE_NAME,
        });
      }
    };

    try {
      const info = await sendEmail(
        to,
        subject,
        await buildHtml(template, context)
      );
      return info.messageId;
    } catch (error) {
      error.service = SERVICE_NAME;
      if (error.method === undefined) {
        error.method = "buildAndSendEmail";
      }
      logger.error("Error building and sending Email", {
        error,
        service: SERVICE_NAME,
      });
    }
  };
}

module.exports = EmailService;
