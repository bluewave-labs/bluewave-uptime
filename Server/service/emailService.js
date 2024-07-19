const fs = require("fs");
const path = require("path");
const { compile } = require("handlebars");
const { mjml2html } = require("mjml");

// Fetching Templates

// Welcome Email Template
const welcomeEmailTemplatePath = path.join(
  __dirname,
  "../templates/welcomeEmail.mjml"
);
const welcomeEmailTemplateContent = fs.readFileSync(
  welcomeEmailTemplatePath,
  "utf8"
);
const welcomeEmailTemplate = compile(welcomeEmailTemplateContent);

// Employee Activation Email Template
const employeeActivationTemplatePath = path.join(
  __dirname,
  "../templates/employeeActivation.mjml"
);
const employeeActivationTemplateContent = fs.readFileSync(
  employeeActivationTemplatePath,
  "utf8"
);
const employeeActivation = compile(employeeActivationTemplateContent);

// No Incident This Week Template
const noIncidentsThisWeekTemplatePath = path.join(
  __dirname,
  "../templates/noIncidentsThisWeek.mjml"
);
const noIncidentsThisWeekTemplateContent = fs.readFileSync(
  noIncidentsThisWeekTemplatePath,
  "utf8"
);
const noIncidentsThisWeek = compile(noIncidentsThisWeekTemplateContent);

// Server is Down Template
const serverIsDownTemplatePath = path.join(
  __dirname,
  "../templates/serverIsDown.mjml"
);
const serverIsDownTemplateContent = fs.readFileSync(
  serverIsDownTemplatePath,
  "utf8"
);
const serverIsDown = compile(serverIsDownTemplateContent);

// Server is Up Template
const serverIsUpTemplatePath = path.join(
  __dirname,
  "../templates/serverIsUp.mjml"
);
const serverIsUpTemplateContent = fs.readFileSync(
  serverIsUpTemplatePath,
  "utf8"
);
const serverIsUp = compile(serverIsUpTemplateContent);

// Password Reset Template
const passwordResetTemplatePath = path.join(
  __dirname,
  "../templates/passwordReset.mjml"
);
const passwordResetTemplateContent = fs.readFileSync(
  passwordResetTemplatePath,
  "utf8"
);
const passwordReset = compile(passwordResetTemplateContent);

// *** Application specific functions ***

function sendWelcomeEmail(context) {
  const mjml = welcomeEmailTemplate(context);
  const html = mjml2html(mjml);

  return html;
}

function sendEmployeeActivationEmail(context) {
  const mjml = employeeActivation(context);
  const html = mjml2html(mjml);

  return html;
}

function sendNoIncidentsThisWeekEmail(context) {
  const mjml = noIncidentsThisWeek(context);
  const html = mjml2html(mjml);

  return html;
}

function sendServerIsDownEmail(context) {
  const mjml = serverIsDown(context);
  const html = mjml2html(mjml);

  return html;
}

function sendServerIsUpEmail(context) {
  const mjml = serverIsUp(context);
  const html = mjml2html(mjml);

  return html;
}

function sendPasswordResetEmail(context) {
  const mjml = passwordReset(context);
  const html = mjml2html(mjml);

  return html;
}

module.exports = {
  sendWelcomeEmail,
  sendEmployeeActivationEmail,
  sendNoIncidentsThisWeekEmail,
  sendServerIsDownEmail,
  sendServerIsUpEmail,
  sendPasswordResetEmail,
};
