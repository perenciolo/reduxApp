"use strict"

// Book reducer
export function booksReducers(state = {
    // INITIAL STATE of books list
    books: [
        {
            id: 1,
            title: 'This is the book title.',
            description: 'This is the book description',
            price: 33.33
        },
        {
            id: 2,
            title: 'This is the second book title.',
            description: 'This is the second book description',
            price: 99.01
        }
    ]
}, action) {
    switch (action.type) {
        case "GET_BOOKS":
            return {...state, books: [...state.books] }
            break;

        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return { books };
            // spread operator requires babel-preset-stage-1
            return { books: [...state.books, ...action.payload] }
            break;

        case "DELETE_BOOK":
            // create a copy of the current array of books
            const currentBookToDelete = [...state.books];

            // determine at which index in books array is the book to be deleted 
            const indexToDelete = currentBookToDelete.findIndex(
                function (book) {
                    return book.id === action.payload.id;
                }
            )

            // use slice to remove the book at the specified index
            return { books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)] }
            break;

        case "UPDATE_BOOK":
            // create a copy of the current array of books
            const currentBookToUpdate = [...state.books];

            // determine at which index in books array is the book to be updated 
            const indexToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    return book.id === action.payload.id;
                }
            );

            // Create a new book object with the new values and with the same array index of the item we want to replace. 
            // To achieve this we wiil use ...spread but we could use concat method too 
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
    }

    // This log has the purpose to show you how newBookToUpdate looks like
    // console.log("What's it newBookToUpdate", newBookToUpdate);

    // Use slice to remove the book at the specified index, replace with the new object and concatenate with 
    // the rest of items in the array 
    return { books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)] };
    break;

}
return state;
};
