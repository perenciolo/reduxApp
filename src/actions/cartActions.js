"use strict"

// ADD to cart
export function addToCart(book) {
    return {
        type: "ADD_TO_CART",
        payload: book
    }
}

// DELETE from cart
export function deleteCartItem(cart) {
    return {
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}

// UPDATE cart
export function updateCart(_id, unit) {
    return {
        type: "UPDATE_CART",
        _id: _id,
        unit: unit
    }
}