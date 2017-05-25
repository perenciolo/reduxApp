"use strict"
import { createStore } from 'redux';

// IMPORT COMBINED REDUCERS 
import reducers from './reducers/index';

// STEP 1 create the Store
const store = createStore(reducers);

store.subscribe(function () {
    console.log('current state is:', store.getState());
    //console.log('current state is:', store.getState()[0].price);
});

// STEP 2 create and dispatch actions
store.dispatch(
    {
        type: "POST_BOOK",
        payload: [
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
    }
);

// DISPATCH a second action
store.dispatch(
    {
        type: "POST_BOOK",
        payload: [{
            id: 3,
            title: 'This is the third book title.',
            description: 'This is the third book description',
            price: 12.20
        }]
    }
);

// DELETE 
store.dispatch(
    {
        type: "DELETE_BOOK",
        payload: { id: 1 }
    }
);

// UPDATE 
store.dispatch(
    {
        type: "UPDATE_BOOK",
        payload: {
            id: 2,
            title: "THIS WAS UPDATED"
        }
    }
);

// -->> CART ACTIONS <<--- //

store.dispatch(
    {
        type: "ADD_TO_CART",
        payload: [{
            id: 1
        }]
    }
); 