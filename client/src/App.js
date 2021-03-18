import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Demo from "./components/Demo/Demo";
import HomePage from "./components/HomePage/HomePage";
// import Plans from "./components/Plans/Plans";
import SignUp from "./components/SignUpIn/SignUp/ActualForm";
import Login from "./components/SignUpIn/SignIn/ActualForm";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/wishlist" exact component={Demo} />
        {/* <Route path="/plans" exact component={Plans} /> */}
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
