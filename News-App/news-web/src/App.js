import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarPage from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AddNews from "./components/AddNews";
import Local from "./components/Local";
import International from "./components/International";
import Political from "./components/Political";
import Sports from "./components/Sports";
import Weather from "./components/Weather";
import Entertainment from "./components/Entertainment";
import SendNotifications from "./components/SendNotifications";

export class App extends Component {
  // store = () => {
  //   firebasedb.ref("test").push({
  //     name: "Ishara",
  //   });
  // };
  render() {
    return (
      <div className="App">
        <NavbarPage />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/local" component={Local} exact />
          <Route path="/international" component={International} exact />
          <Route path="/political" component={Political} exact />
          <Route path="/sports" component={Sports} exact />
          <Route path="/entertainment" component={Entertainment} exact />
          <Route path="/weather" component={Weather} exact />
          <Route path="/addnews" component={AddNews} />
          <Route path="/sendnotify" component={SendNotifications} />
        </Switch>
      </div>
    );
  }
}

export default App;
