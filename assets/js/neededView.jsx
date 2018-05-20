import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui/Card/index";
import LinearProgress from 'material-ui/LinearProgress';


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
      this.setState({list: res});
    });
  }
  cards() {
    return this.state.list.map(x => {
      return (<Card key={x.name} containerStyle={{paddingLeft: 5, paddingRight: 5, marginBottom: 10}}>
        <CardHeader
          title={x.item.name}
          subtitle={`${x.item.quantity}/100`}
          avatar={x.item.image}>
        </CardHeader>
        <LinearProgressDeterminate
          completed={58}
        />
      </Card>)
    });
  }
  render () {
    return (<div>
      <div>
      {this.cards()}
      </div>
    </div>);
  }
}

class LinearProgressDeterminate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.progress(this.props.completed)
  }

  componentWillUnmount() {
    // clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
    }
  }

  render() {
    return (
      <LinearProgress mode="determinate" value={this.state.completed} />
    );
  }
}