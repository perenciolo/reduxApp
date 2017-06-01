"use strict"
import React from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button, InputGroup, DropdownButton, Image, Row, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { getBooks, postBooks, deleteBooks } from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount() {
        this.props.getBooks();

        // GET IMAGES FROM API
        axios
            .get('/api/images')
            .then(response => this.setState({ images: response.data }))
            .catch(err => this.setState({ images: 'Error loading image files from the server', img: '' }));
    }


    handleSubmit() {
        var book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value,
        }];

        this.props.postBooks(book);
    }

    handleSelect(img) {
        this.setState({ img: '/img/' + img })
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }

    render() {
        const booksList = this.props.books.map(function (booksArr) {
            return (
                <option key={booksArr._id}>{booksArr._id}</option>
            );
        });

        const imgList = this.state.images.map(function (imgArr, i) {
            return (
                <MenuItem
                    key={i}
                    eventKey={imgArr.name}
                    onClick={this.handleSelect.bind(this, imgArr.name)}
                    >
                    {imgArr.name}
                </MenuItem>
            );
        }, this);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary"
                                    >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
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
                                    placeholder="Enter Description"
                                    ref="description" />
                            </FormGroup>

                            <FormGroup controlId="price">
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price" />
                            </FormGroup>

                            <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
                        </Panel>
                        <Panel style={{ marginTop: '25px' }}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
                        </Panel>
                    </Col>
                </Row>
            </Well >
        );
    }

}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks,
        postBooks,
        deleteBooks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);