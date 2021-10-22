// Set Template Content
// Set Header
const mailHeader = `<h1 style="color: #018c4c; font-size: 48px; border-bottom: solid 2px #ccc;padding-bottom: 10px">
      Entionary - Learn English<br />
    </h1>`;
// Set Footer
const mailFooter = `<h3 style="color: red">
        Warming: Do not give the code to any one, it may lead to lose your account.<br />
        The code is only valid for <i>10 minutes </i> when you receive this mail.
    </h3>
    <h1>Best Regard</h1>`;

// Content to reset Password
const resetPasswordMailContent = (code) => `<div>
    ${mailHeader}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Dear you,<br />
        Entionary has received your request about resetting the password.<br />
        Don't worry about that, Please enter this code to set new password:
    </h2>
    <h1 style="background: #eee;padding: 10px;">
      <i><b>${code}</b></i>
    </h1>
    ${mailFooter}
  </div>`;

module.exports = {
  resetPasswordMailContent,
};
