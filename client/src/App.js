import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Demo from "./components/Demo/Demo";
import HomePage from "./components/HomePage/HomePage";
// import Plans from "./components/Plans/Plans";
import FinalForm from "./components/SignUp/FinalForm";
// import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/demo" exact component={Demo} />
        {/* <Route path="/plans" exact component={Plans} /> */}
        <Route path="/sign-up" exact component={FinalForm} />
        {/* <Route path="/sign-in" exact component={SignIn} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
