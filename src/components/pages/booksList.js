"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/booksActions';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button, Carousel } from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './BooksForm';
import Cart from './cart';

class BooksList extends React.Component {
    componentDidMount() {
        this.props.getBooks()
    }
    render() {
        const booksList =
            this.props.books.map(function (booksArr) {
                return (
                    <Col xs={12} sm={12} md={4}
                        key={booksArr._id} className="display-items">
                        <BookItem
                            _id={booksArr._id}
                            title={booksArr.title}
                            description={booksArr.description}
                            images={booksArr.images}
                            price={booksArr.price} />
                    </Col>
                )
            })
        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="/img/locky-ransomware.jpg" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="/img/dasahara.jpg" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row className="display-container">
                    {booksList}
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks: getBooks
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);