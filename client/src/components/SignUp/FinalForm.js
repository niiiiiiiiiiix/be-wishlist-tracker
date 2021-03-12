import React, { useState } from "react";
import FormSignUp from "./FormSignUp";
import FormSuccess from "./FormSuccess";
import "./FinalForm.css";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }

  return (
    <div>
      {!submitted ? <FormSignUp submitForm={submitForm} /> : <FormSuccess />}
    </div>
  );
};

export default Form;
