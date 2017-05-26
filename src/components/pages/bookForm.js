"use strict"

// IMPORT React
import React from 'react';
import { Well, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';

// IMPORT Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// IMPORT ACTIONS
import { postBooks } from '../../actions/booksActions';

class BooksForm extends React.Component {
    handleSubmit() {
        const book = [{
            id: Math.floor(Math.random() * 11),
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }];

        this.props.postBooks(book);
    }

    render() {
        return (
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Title"
                            ref="title" />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter the description"
                            ref="description" />
                    </FormGroup>
                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="number"
                            placeholder="CAD $ 2.00"
                            ref="price" />
                    </FormGroup>
                </Panel>
                <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
            </Well>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postBooks }, dispatch);
}

export default connect(null, mapDispatchToProps)(BooksForm);