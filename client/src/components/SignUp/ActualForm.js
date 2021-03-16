import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import FormSuccess from "./FormSuccess";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }

  return (
    <div>
      {!submitted ? <SignUpForm submitForm={submitForm} /> : <FormSuccess />}
    </div>
  );
};

export default Form;
