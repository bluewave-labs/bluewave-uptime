const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { compile } = require("handlebars");
const { mjml2html } = require("mjml");

class EmailService {
  constructor() {
    this.loadTemplate = (templateName) => {
      const templatePath = path.join(
        __dirname,
        `../templates/${templateName}.mjml`
      );
      const templateContent = fs.readFileSync(templatePath, "utf8");
      return compile(templateContent);
    };

    // TODO  Load less used templates in their respective functions
    this.templateLookup = {
      welcomeEmailTemplate: this.loadTemplate("welcomeEmail"),
      employeeActivationTemplate: this.loadTemplate("employeeActivation"),
      noIncidentsThisWeekTemplate: this.loadTemplate("noIncidentsThisWeek"),
      serverIsDownTemplate: this.loadTemplate("serverIsDown"),
      serverIsUpTemplate: this.loadTemplate("serverIsUp"),
      passwordResetTemplate: this.loadTemplate("passwordReset"),
    };

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST,
      port: process.env.EMAIL_SERVICE_PORT,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_SERVICE_USERNAME,
        pass: process.env.EMAIL_SERVICE_PASSWORD,
      },
    });
  }

  buildAndSendEmail = async (template, context, to, subject) => {
    const buildHtml = (template, context) => {
      const mjml = this.templateLookup[template](context);
      const html = mjml2html(mjml);
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
