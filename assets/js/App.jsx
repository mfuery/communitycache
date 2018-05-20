import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import PledgeView from "./pledgeView.jsx";
import NeededView from "./neededView.jsx";
import FulfilledView from "./fulfilledView.jsx";
import MapContainer from "./map.jsx";
import {AppBar} from "material-ui";
import {Tab, Tabs} from "material-ui/Tabs/index";
import {logo} from '../images/logo_small.png'


export default class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <AppBar iconElementLeft={logo} title={"Community Cache"} zDepth={0}>
            <logo/>
        </AppBar>
        <Tabs>
          <Tab label="Pledge" containerElement={<Link to={'/'}/>} />
          <Tab label="Needed" containerElement={<Link to={'/needed'}/>} />
          <Tab label="Fulfilled" containerElement={<Link to={'/fulfilled'}/>} />
        </Tabs>
        <Switch>
          <Route exact path='/' component={PledgeView}/>
          <Route path='/needed' component={NeededView}/>
          <Route path='/fulfilled' component={FulfilledView}/>
          <Route path='/map' component={MapContainer}/>
        </Switch>
        <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/"
             data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank"
                                                                                       href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                                                                                       className="fb-xfbml-parse-ignore">Share</a>
        </div>
      </div>
    );
  }
}
