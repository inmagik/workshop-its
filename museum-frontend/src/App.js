import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ArtistsList from './pages/ArtistsList'
import ArtistDetail from './pages/ArtistDetail'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/artists" exact component={ArtistsList} />
            <Route path="/artists/:id" exact component={ArtistDetail} />
            <Redirect from="/" to="/artists"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
