import React, { Component } from 'react';
import Modal from 'react-modal';
import {FlatButton, RaisedButton, TextField} from "material-ui";
import {customStyles} from "./styles.js";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Link from "react-router-dom/es/Link";

import LinearProgressDeterminate from "./progress.jsx";

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
}

export default class PledgeView extends Component {
    constructor(props) {
        super();
        this.state = {
            currentItem: null,
            list: [],
        };
        this.state.currentIndex = 0;
        this.state.quantity = 0;
        this.state.currentItem = this.state.list[this.state.currentIndex];
        this.state.acceptedItems = [];
        this.state.rejectedItems = [];

        // Modal
        this.state.modalIsOpen = false;
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        fetch('/api/needs')
            .then(res => {
                return res.json();
            })
            .then(res => {
                let list = res;
                if (list.length > 0) {
                    this.setState({items: list});
                    this.setState({
                        currentIndex: 0,
                        currentItem: list[0],
                        list: res,
                    });
                }
            })
    }
    handleChange(event) {
        this.setState({quantity: event.target.value});
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
        let needId = this.state.currentItem.id;
        postData('/api/pledges/', {
            need: needId,
            user_profile: 1,
            quantity: this.state.quantity
        }).then(res => {
            console.log(res);
            // return res;
            return;
        });
        this.closeModal();
        this.getNextItem();
    }
    approveForm() {
        this.setState({
            modalIsOpen: true
        });
    }
    renderItem() {
        if (this.state.list.length > 0) {
            return (
                <Item
                    item={this.state.currentItem}
                    approveAction={this.approveAction.bind(this)}
                    approveForm={this.approveForm.bind(this)}
                    rejectAction={this.rejectAction.bind(this)}
                />
            )
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
        return (
            <div className={"pledge-container"}>
                {this.renderItem()}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal.bind(this)}>close</button>
                    <ItemForm
                        approveAction={this.approveAction.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    />
                </Modal>
            </div>);
    }
}

class Item extends Component {
    render() {
        let item = this.props.item;
        let lat = item.depot.lat;
        let lng = item.depot.lon;
        let qty = item.quantity - item.quantity_fulfilled_so_far;
        let qtyNeeded = qty < 0 ? 0 : qty;
        return (<div>
            <Image src={this.props.item.item.image}/>
            <div className={"pledge-text"}>
                <span>{qtyNeeded} of {this.props.item.quantity} needed at this location</span>
                <br/>
                <br/>
                <LinearProgressDeterminate
                    completed={this.props.item.progress}
                />
                <h1>{this.props.item.item.name}</h1>
                <div><strong>{this.props.item.description}</strong></div>
                <div><p><strong>Nationwide Catastrophe Cache</strong><br/>{this.props.item.depot.name}<br/>
                    <Link to={{pathname: '/map', state: {lat, lng, item}}}>{this.props.item.depot.address}<br />{this.props.item.depot.city}, {this.props.item.depot.state}</Link></p></div>
            </div>
            <div className={"bottom-nav"}>
                <div className={"item-buttons-container"}>
                    <RaisedButton labelColor={'#ffffff'} backgroundColor={'#72006e'} onClick={this.props.rejectAction} className="item-button" label={"I don't have that"} labelStyle={{fontSize: 22, textTransform: 'none'}}/>
                    <RaisedButton backgroundColor={'#a5009d'} labelColor={'#ffffff'} onClick={this.props.approveForm} className="item-button" label={"I can donate this!"} labelStyle={{fontSize: 22, textTransform: 'none'}}/>
                </div>
            </div>
        </div>);
    }
}


class Image extends Component {
    render() {
        return <div className={"image-container"}>
            <img className={"item-img"} src={this.props.src}/>
        </div>
    }
}

class ItemForm extends Component {
    render() {
        return (<div className={"modal-form"}>
            <h5>How many items do you wish to donate?</h5>
            <form>
                {/*<input type={"number"} onChange={this.props.handleChange}/>*/}
                <TextField label="Quantity" type="number" onChange={this.props.handleChange}/>
                <FlatButton label="Submit" color="primary" onClick={this.props.approveAction}/>
            </form>
        </div>);
    }
}
