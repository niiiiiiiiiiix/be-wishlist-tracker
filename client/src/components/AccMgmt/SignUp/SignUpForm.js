import "../SignInUp.css";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values) => {
        // swal("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
        // console.log(values);
        axios
          .post(`${process.env.REACT_APP_API_URL}/user/signup`, values)
          .then((response) => {
            console.log(response);
            alert("Sign up success!");
          })
          .catch(() => {
            alert("Error! Please try a different username or email!");
          });
      }}
    >
      {({ errors, status, touched }) => (
        <Form className="form">
          <div className="sub-form">
            <div className="all-form-inputs">
              <label htmlFor="username" className="form-label">
                username:
              </label>
              <Field
                name="username"
                type="text"
                className={
                  "form-input" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
                placeholder="enter a username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="all-form-inputs">
              <label htmlFor="email" className="form-label">
                email:
              </label>
              <Field
                name="email"
                type="text"
                className={
                  "form-input" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
                placeholder="enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="all-form-inputs">
              <label htmlFor="password" className="form-label">
                password:
              </label>
              <Field
                name="password"
                type="password"
                className={
                  "form-input" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
                placeholder="enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="all-form-inputs">
              <label htmlFor="confirmPassword" className="form-label">
                confirm password:
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  "form-input" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
                placeholder="re-enter your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="form-input-btn">
              sign up
            </button>
            <span className="form-input-login">
              already have an account? login <a href="/login">here</a>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
