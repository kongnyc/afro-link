import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NewBusiness from "./components/NewBusiness";
import MainPage from "./components/MainPage";
import Results from "./components/Results";
import Business from "./components/Business";
import SignUp from "./components/SignUp";
import "./App.css";
import LandingPage from "./components/LandingPage";
require("dotenv").config();

// import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/newBusiness" component={NewBusiness} />
        <Route path="/categories/:id" component={Results} />
        <Route path="/businesses/:id" component={Business} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
