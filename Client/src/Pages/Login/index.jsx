import "./index.css";
import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import Logomark from "../../assets/Images/Logomark.png";
import EmailTextField from "../../Components/TextFields/Email/EmailTextField";
import CheckBox from "../../Components/Checkbox/Checkbox";
import Button from "../../Components/Button";
import Google from "../../assets/Images/Google.png";
import PasswordTextField from "../../Components/TextFields/Password/PasswordTextField";

const Login = () => {
  return (
    <div className="login-page">
      <BackgroundPattern></BackgroundPattern>
      <div className="login-form">
        <div className="login-form-header">
          <img
            className="login-form-header-logo"
            src={Logomark}
            alt="Logomark"
          />
          <div className="login-form-v-spacing" />
          <div className="login-form-heading">Log in to your account</div>
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-inputs">
          <EmailTextField
            error={false}
            placeholder="Enter your email"
            id="login-email-input"
          />
          <div className="login-form-v2-spacing" />
          <PasswordTextField
            error={false}
            placeholder="Password"
            id="login-email-input"
          />
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-password-options">
          <CheckBox />
          <div className="login-form-forgot-password">Forgot password</div>
        </div>
        <div className="login-form-v3-spacing" />
        <div className="login-form-actions">
          <Button level="primary" label="Sign in" sx={{ width: "100%" }} />
          <div className="login-form-v-spacing" />
          <Button
            level="secondary"
            label="Sign in with Google"
            sx={{ width: "100%", color: "#344054", fontWeight: "700" }}
            img={<img className="google-enter" src={Google} alt="Google" />}
          />
        </div>
        <div className="login-form-v3-spacing" />
        <div className="new-account-option">
          Don’t have an account?
          <span className="new-account-option-span">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
