import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NewBusiness from "./components/NewBusiness";
import MainPage from "./components/MainPage";
import Results from "./components/Results"
import "./App.css";

// import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={MainPage} /> //testing
        <Route exact path="/newBusiness" component={NewBusiness} /> //testing
        <Route path="/categories/:id" component={Results}/>
        {/* <Route exact path="/" component={Home}/> */}
        {/* <Route exact path="/NewBusiness" component={NewBusiness}/> */}
        {/* <Route exact path="/Search" component={Search}/> */}
      </Switch>
    </div>
  );
}

export default App;
