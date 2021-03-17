import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignUpSuccess from "./SignUpSuccess";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }

  return (
    <div>
      {!submitted ? <SignUpForm submitForm={submitForm} /> : <SignUpSuccess />}
    </div>
  );
};

export default Form;
