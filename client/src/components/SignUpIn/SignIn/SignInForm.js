import "../SignInUp.css";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values) => {
        axios
          .post("http://localhost:5000/user/login", values, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            alert("Log in success!");
          })
          .catch((error) => {
            alert("Error! Please try a different username or password!");
          });
      }}
    >
      {({ errors, status, touched }) => (
        <Form className="form">
          <div className="sub-form">
            <div className="all-form-inputs">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <Field
                name="username"
                type="text"
                className={
                  "form-input" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="all-form-inputs">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                name="password"
                type="password"
                className={
                  "form-input" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="form-input-btn">
              Sign In
            </button>
            <span className="form-input-login">
              Don't have an account? Sign up <a href="/sign-up">here</a>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
