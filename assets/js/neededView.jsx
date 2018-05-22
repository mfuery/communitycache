import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardText, CardTitle} from "material-ui/Card/index";
import {RefreshIndicator} from "material-ui";
import LinearProgressDeterminate from "./progress.jsx";


export default class NeededView extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: null,
      list: [],
    };
  }
  componentDidMount() {
    fetch('/api/needs').then(res => res.json()).then(res => {
      this.setState({list: res.filter(x => !x.is_fulfilled)});
    });
  }
  cards() {
    if (this.state.list.length > 0) {
      return this.state.list.map(x => {
        return (<Card key={x.name} containerStyle={{paddingLeft: 5, paddingRight: 5, marginBottom: 10, fontSize:22}}>
          <CardHeader
            title={x.item.name}
            subtitle={`${x.quantity_fulfilled_so_far}/${x.quantity} units fulfilled`}
            avatar={x.item.image}
          titleStyle={{fontSize: 22}}
          subtitleStyle={{fontSize:19}}>
          </CardHeader>
          <CardText style={{fontSize: 18}}>{x.description}</CardText>
          <LinearProgressDeterminate
            completed={x.progress}
          />
        </Card>)
      });
    } else {
      return (<div>
        <RefreshIndicator
          size={40}
          left={170}
          top={200}
          status="loading"/>
      </div>);
    }
  }
  render () {
    return (<div>
      <div>
        {this.cards()}
      </div>
    </div>);
  }
}
