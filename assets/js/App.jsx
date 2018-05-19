import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class App extends Component {
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
    this.state.currentIndex = 0;
    this.state.currentItem = this.state.list[this.state.currentIndex];
    this.state.acceptedItems = [];
    this.state.rejectedItems = [];

    // Modal
    this.state.modalIsOpen = false;
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  getNextIndex() {
    let index = this.state.currentIndex;
    return (++index === this.state.list.length) ? 0 : index;
  }
  getNextItem() {
    let currentIndex = this.getNextIndex();
    this.setState({
      currentIndex: currentIndex,
      currentItem: this.state.list[currentIndex],
    });
  }
  rejectAction() {
    this.getNextItem();
  }
  approveAction() {
    this.closeModal();
    this.getNextItem();
  }
  approveForm() {
    this.setState({
      modalIsOpen: true
    });
  }
  render() {
    console.log('haha');
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className={"navbar"}>
          <div className={"nav-item"}>Pledged</div>
          <div className={"nav-item"}>Needed</div>
          <div className={"nav-item"}>Fulfilled</div>
        </div>
        <Item
          item={this.state.currentItem}
          approveAction={this.approveForm.bind(this)}
          rejectAction={this.rejectAction.bind(this)}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal}>close</button>
          <ItemForm
            approveAction={this.approveAction.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

class ItemForm extends Component {
  render() {
    return (<div>
      <form>
        <input type={"number"}/>
        <button onClick={this.props.approveAction}>Submit</button>
      </form>
    </div>);
  }
}
class Item extends Component {
  render() {
    return (<div>
      <Image src={this.props.item.image}/>
      <div>Quantity Needed: {this.props.item.quantity}</div>
      <div className={"item-buttons-container"}>
        <button onClick={this.props.rejectAction}>Reject</button>
        <button onClick={this.props.approveAction}>Approve</button>
      </div>
    </div>);
  }
}

class Image extends Component {
  render() {
    return <div className={"image-container"}>
      <img src={this.props.src}/>
    </div>
  }
}

