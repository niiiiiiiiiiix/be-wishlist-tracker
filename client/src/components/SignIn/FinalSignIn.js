import React, { useState } from "react";
import FormSignIn from "./FormSignIn";
import SignInSuccess from "./SignInSuccess";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }

  return (
    <div>
      {!submitted ? <FormSignIn submitForm={submitForm} /> : <SignInSuccess />}
    </div>
  );
};

export default Form;
