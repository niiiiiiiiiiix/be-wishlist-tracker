import React from "react";
import "./SignUpForm.css";
import useForm from "./useForm";
import validateInfo from "./validateInfo";

const SignUpForm = ({ submitForm }) => {
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
          <label htmlFor="username" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
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
        <div className="all-form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm Password:
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="Re-enter your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <a href="/sign-in">here</a>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
