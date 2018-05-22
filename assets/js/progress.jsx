import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class LinearProgressDeterminate extends Component {

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
      <LinearProgress color="#a5009d" mode="determinate" value={this.state.completed} />
    );
  }
}