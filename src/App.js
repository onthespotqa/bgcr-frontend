import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import KeyedRoute from './components/KeyedRoute'
import NavBar from "./views/Nav/NavBar";
import {Container} from "@material-ui/core";
import Guru from './views/Gurus/show'
import GuruNew from "./views/Gurus/new";
import GuruIndex from "./views/Gurus";
import GuruFoundationNew from "./views/Foundations/new";
import GuruEdit from "./views/Gurus/edit";

Sentry.init({dsn: "https://28a51e6fa71a4511baa3544bf12a524c@sentry.io/1765085"});

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: {}
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
           <div>
               <NavBar></NavBar>
               <Container>
                   <div id="content">
                       <Switch default={'/'}>
                           <KeyedRoute exact path="/" component={GuruIndex} />
                           <KeyedRoute exact path="/gurus/:id/foundations/new" component={GuruFoundationNew} />
                           <KeyedRoute exact path="/gurus/new" component={GuruNew} />
                           <KeyedRoute exact path="/gurus/:id" component={Guru} />
                           <KeyedRoute exact path="/gurus/:id/edit" component={GuruEdit} />
                           <KeyedRoute exact path="/gurus" component={GuruIndex} />

                       </Switch>
                   </div>
               </Container>
           </div>
        </Router>
      </div>
    )
  }
}


export default App;
