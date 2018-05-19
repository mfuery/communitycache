import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import PledgeView from "./pledgeView.jsx";
import NeededView from "./neededView.jsx";
import FulfilledView from "./fulfilledView.jsx";


export default class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className={"App-title"}>Cat Stuff</h2>
        </header>
        <nav className={"navbar"}>
          <ul>
            <li className={"nav-item"}><Link to={'/'}>Pledged</Link></li>
            <li className={"nav-item"}><Link to={'/needed'}>Needed</Link></li>
            <li className={"nav-item"}><Link to={'/fulfilled'}>Fulfilled</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path='/' component={PledgeView}/>
          <Route path='/needed' component={NeededView}/>
          <Route path='/fulfilled' component={FulfilledView}/>
        </Switch>
      </div>
    );
  }
}
