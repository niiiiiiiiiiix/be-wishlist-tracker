import React from "react";
import "../SignInUp.css";
import useForm from "./useForm";
import validateInfo from "./validateInfo";

const SignInForm = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validateInfo
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="sub-form">
        <div className="all-form-inputs">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="all-form-inputs">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign in
        </button>
        <span className="form-input-login">
          Don't have an account? Sign up <a href="/sign-up">here</a>
        </span>
      </div>
    </form>
  );
};

export default SignInForm;
