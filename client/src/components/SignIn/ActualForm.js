import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignInSuccess from "./SignInSuccess";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }

  return (
    <div>
      {!submitted ? <SignInForm submitForm={submitForm} /> : <SignInSuccess />}
    </div>
  );
};

export default Form;
