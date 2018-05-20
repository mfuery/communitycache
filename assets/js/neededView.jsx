import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui/Card/index";
import LinearProgress from 'material-ui/LinearProgress';
import {RaisedButton} from "material-ui";


export default class NeededView extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: null,
      list: [],
      items: {},
      // list: [
      //   {
      //     name: 'Rubix Cube',
      //     quantity: 10,
      //     image: 'https://4vector.com/i/free-vector-rubik-s-cube-random-clip-art_106251_Rubiks_Cube_Random_clip_art_medium.png'
      //   },
      //   {
      //     name: 'Toilet Paper',
      //     quantity: 10,
      //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Toiletpapier_%28Gobran111%29.jpg/1200px-Toiletpapier_%28Gobran111%29.jpg'
      //   },
      //   {
      //     name: 'Spam',
      //     quantity: 10,
      //     image: 'https://thumbs-prod.si-cdn.com/CjIhFJJGItoI-h00PsYpINkhabU=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/a3/a5/a3a5e93c-0fd2-4ee7-b2ec-04616b1727d1/kq4q5h7f-1498751693.jpg'
      //   },
      // ]
    };
  }
  componentDidMount() {
    fetch('/api/needs').then(res => res.json()).then(res => {
      this.setState({list: res});
    });
  }
  cards() {
    return this.state.list.map(x => {
      return (<Card key={x.name} containerStyle={{paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
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
      <div className={"bottom-nav"}>
        <div className={"item-buttons-container"}>
          <RaisedButton className={"item-button"} onClick={e => null} label={"Request Supplies"} />
        </div>
      </div>
    </div>);
  }
}


class LinearProgressDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.progress(this.props.completed)
    // this.timer = setTimeout(() => this.progress(5), 1000);
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