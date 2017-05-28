"use strict"

// CART REDUCERS
export function cartReducers(state = { cart: [] }, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return { cart: [...state, ...action.payload] }
            break;
        
        case "UPDATE_CART":
            // create a copy of the current array of books
            const currentBookToUpdate = [...state.cart];

            // determine at which index in books array is the book to be updated 
            const indexToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    return book._id === action._id;
                }
            );

            // Create a new object with the new values and with the same array index of the item we want to replace. 
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
            }       

            let cartUpdate = [
                    ...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, 
                    ...currentBookToUpdate.slice(indexToUpdate + 1)
                    ];

            return { cart: [...state, ...cartUpdate] }
            break;
        
        case "DELETE_CART_ITEM":
            return { cart: [...state, ...action.payload] }
            break;
    }

    return state;
}