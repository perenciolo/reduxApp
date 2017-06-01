"use strict"
import axios from 'axios';

// GET cart
export function getCart() {
    return function (dispatch) {
        axios
            .get('/api/cart')
            .then(function (response) {
                dispatch({
                    type: "GET_CART",
                    payload: response.data
                })
            })
            .catch(function (err) {
                dispatch({
                    type: "GET_CART_REJECTED",
                    msg: "Error while getting the cart"
                })
            })
    }
}

// ADD to cart
export function addToCart(cart) {
    return function (dispatch) {
        axios
            .post('/api/cart', cart)
            .then(function (response) {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data
                });
            })
            .catch(function (err) {
                dispatch({
                    type: "ADD_TO_CART_REJECTED",
                    msg: 'error when adding to the cart.'
                });
            });
    }
}

// DELETE from cart
export function deleteCartItem(cart) {
    return function (dispatch) {
        axios
            .post('/api/cart', cart)
            .then(function (response) {
                dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: response.data
                });
            })
            .catch(function (err) {
                dispatch({
                    type: "ADD_TO_CART_REJECTED",
                    msg: 'error when deleting from the cart.'
                });
            });
    }
}

// UPDATE cart
export function updateCart(_id, unit, cart) {
    // create a copy of the current array of books
    const currentBookToUpdate = cart;

    // determine at which index in books array is the book to be updated 
    const indexToUpdate = currentBookToUpdate.findIndex(
        function (book) {
            return book._id === _id;
        }
    );

    // Create a new object with the new values and with the same array index of the item we want to replace. 
    const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
}

let cartUpdate = [
    ...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)
];

return function (dispatch) {
    axios
        .post('/api/cart', cartUpdate)
        .then(function (response) {
            dispatch({
                type: "UPDATE_CART",
                payload: response.data
            });
        })
        .catch(function (err) {
            dispatch({
                type: "UPDATE_CART_REJECTED",
                msg: 'error when updating the cart.'
            });
        });
}
}