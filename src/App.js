import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import registerform from "./pages/registerform";
import signout from "./pages/signout";
import bookappointment from "./pages/bookappointment";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login}/>
        <Route path="/registerform" component={registerform} />
        <Route path="/signout" component={signout} />
        <Route path="/bookappointment" component={bookappointment} />
      </Switch>
    </Router>
  );
}
export default App;
