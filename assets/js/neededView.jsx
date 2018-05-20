import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui/Card/index";

export default class NeededView extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: null,
      list: [
        {
          name: 'Rubix Cube',
          quantity: 10,
          image: 'https://4vector.com/i/free-vector-rubik-s-cube-random-clip-art_106251_Rubiks_Cube_Random_clip_art_medium.png'
        },
        {
          name: 'Toilet Paper',
          quantity: 10,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Toiletpapier_%28Gobran111%29.jpg/1200px-Toiletpapier_%28Gobran111%29.jpg'
        },
        {
          name: 'Spam',
          quantity: 10,
          image: 'https://thumbs-prod.si-cdn.com/CjIhFJJGItoI-h00PsYpINkhabU=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/a3/a5/a3a5e93c-0fd2-4ee7-b2ec-04616b1727d1/kq4q5h7f-1498751693.jpg'
        },
      ]
    };
  }
  cards() {
    return this.state.list.map(x => {
      return (<Card key={x.name}>
        <CardHeader
          title={x.name}
          subtitle={`${x.quantity}/100`}
          avatar={x.image}>
        </CardHeader>
      </Card>)
    });
  }
  render () {
    return (<div>
      {this.cards()}
    </div>);
  }
}