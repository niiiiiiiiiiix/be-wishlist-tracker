import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Wishlist from "./components/Wishlist/Wishlist";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/SignUpIn/SignUp/SignUpForm";
import Login from "./components/SignUpIn/SignIn/SignInForm";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/wishlist" exact component={Wishlist} />
        {/* <Route path="/plans" exact component={Plans} /> */}
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
