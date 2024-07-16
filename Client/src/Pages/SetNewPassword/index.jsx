import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import LockIcon from "../../assets/Images/lock-icon.png";
import Check from "../../Components/Check/Check";
import ButtonSpinner from "../../Components/ButtonSpinner";
import LeftArrow from "../../assets/Images/arrow-left.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { credentials } from "../../Validation/validation";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../../Features/Auth/authSlice";
import { createToast } from "../../Utils/toastUtils";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });

  const idMap = {
    "register-password-input": "password",
    "confirm-password-input": "confirm",
  };

  const { isLoading } = useSelector((state) => state.auth);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordForm = { ...form };
    const { error } = credentials.validate(passwordForm, {
      abortEarly: false,
      context: { password: form.password },
    });

    if (error) {
      // validation errors
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({
        variant: "info",
        body:
          error.details && error.details.length > 0
            ? error.details[0].message
            : "Error validating data.",
        hasIcon: false,
      });
    } else {
      delete passwordForm.confirm;
      const action = await dispatch(
        setNewPassword({ token: token, form: passwordForm })
      );
      if (action.payload.success) {
        navigate("/new-password-confirmed");
        createToast({
          variant: "info",
          body: "Your password was reset successfully.",
          hasIcon: false,
        });
      } else {
        if (action.payload) {
          // dispatch errors
          createToast({
            variant: "info",
            body: action.payload.msg,
            hasIcon: false,
          });
        } else {
          // unknown errors
          createToast({
            variant: "info",
            body: "Unknown error.",
            hasIcon: false,
          });
        }
      }
    }
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idMap[id];
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { error } = credentials.validate(
      { [name]: value },
      { abortEarly: false, context: { password: form.password } }
    );

    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
  };

  return (
    <div className="set-new-password-page">
      <BackgroundPattern />
      <form className="set-new-password-form" onSubmit={handleSubmit}>
        <div className="set-new-password-form-header">
          <img
            className="set-new-password-form-header-logo"
            src={LockIcon}
            alt="LockIcon"
          />
          <div className="set-new-password-form-gap-medium" />
          <div className="set-new-password-form-heading">Set new password</div>
          <div className="set-new-password-form-gap-small" />
          <div className="set-new-password-form-subheading">
            Your new password must be different to previously used passwords.
          </div>
        </div>
        <div className="set-new-password-form-gap-large"></div>
        <div className="set-new-password-form-content">
          <Field
            type="password"
            id="register-password-input"
            label="Password"
            isRequired={true}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="set-new-password-form-gap-medium"></div>
          <Field
            type="password"
            id="confirm-password-input"
            label="Confirm password"
            isRequired={true}
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />
          <div className="set-new-password-form-gap-medium"></div>
          <div className="set-new-password-form-checks">
            <Check text="Must be at least 8 characters" />
            <div className="set-new-password-form-gap-small"></div>
            <Check text="Must contain one special character" />
          </div>
          <div className="set-new-password-form-gap-medium"></div>
          <ButtonSpinner
            disabled={Object.keys(errors).length !== 0}
            isLoading={isLoading}
            onClick={handleSubmit}
            level="primary"
            label="Reset password"
            sx={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "200",
              height: "35px",
            }}
          />
        </div>
        <div className="set-new-password-form-gap-medium"></div>
        <div className="set-new-password-back-button">
          <img
            className="set-new-password-back-button-img"
            src={LeftArrow}
            alt="LeftArrow"
          />
          <div className="set-new-password-back-button-text">
            Back to log in
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetNewPassword;
