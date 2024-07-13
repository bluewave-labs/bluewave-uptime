import BackgroundPattern from "../../Components/BackgroundPattern/BackgroundPattern";
import "./index.css";
import LockIcon from "../../assets/Images/lock-icon.png";
import Check from "../../Components/Check/Check";
import Button from "../../Components/Button";
import LeftArrow from "../../assets/Images/arrow-left.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { newPasswordValidation } from "../../Validation/validation";
import axiosInstance from "../../Utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Field from "../../Components/Inputs/Field";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const idMap = {
    "register-password-input": "password",
    "confirm-password-input": "confirm",
  };

  const handleInput = (e) => {
    const fieldName = idMap[e.target.id];
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(errors);
  };

  const handleSubmit = async () => {
    // TODO show loading spinner
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/recovery/validate", {
        recoveryToken: token,
      });
      await axiosInstance.post("/auth/recovery/reset", {
        ...form,
        recoveryToken: token,
      });
      navigate("/new-password-confirmed");
    } catch (error) {
      // TODO display error (Toast?)
      alert(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { error } = newPasswordValidation.validate(form, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, err) => {
        return { ...acc, [err.path[0]]: err.message };
      }, {});
      setErrors(validationErrors);
    } else {
      setErrors({});
    }
  }, [form]);

  const { token } = useParams();
  return (
    <div className="set-new-password-page">
      <BackgroundPattern />
      <div className="set-new-password-form">
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
            onChange={handleInput}
            error={errors.password}
          />
          <div className="set-new-password-form-gap-medium"></div>
          <Field
            type="password"
            id="confirm-password-input"
            label="Confirm password"
            isRequired={true}
            placeholder="••••••••"
            onChange={handleInput}
            error={errors.confirm}
          />
          <div className="set-new-password-form-gap-medium"></div>
          <div className="set-new-password-form-checks">
            <Check text="Must be at least 8 characters" />
            <div className="set-new-password-form-gap-small"></div>
            <Check text="Must contain one special character" />
          </div>
          <div className="set-new-password-form-gap-medium"></div>
          <Button
            disabled={Object.keys(errors).length !== 0 || isLoading === true}
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
      </div>
    </div>
  );
};

export default SetNewPassword;
