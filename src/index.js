import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import store, { fetchClients, fetchSkills, fetchClientSkills } from "./store";
import Home from "./Home";
import SkillForm from "./SkillForm";

const App = connect(null, (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchClients());
      dispatch(fetchSkills());
      dispatch(fetchClientSkills());
    },
  };
})(
  class App extends Component {
    componentDidMount() {
      this.props.loadData();
    }

    render() {
      return (
        <div>
          <h1><Link to='/'>Acme Talent Agency</Link></h1>
          <Route exact path='/' component={Home} />
          <Route path='/skills/:id' component={SkillForm} />
        </div>
      );
    }
  }
);

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
