import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Demo from "./components/Demo/Demo";
import HomePage from "./components/HomePage/HomePage";
// import Plans from "./components/Plans/Plans";
import ActualForm from "./components/SignUp/ActualForm";
import FinalSignIn from "./components/SignIn/FinalSignIn";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/demo" exact component={Demo} /> */}
        {/* <Route path="/plans" exact component={Plans} /> */}
        <Route path="/sign-up" exact component={ActualForm} />
        <Route path="/sign-in" exact component={FinalSignIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
