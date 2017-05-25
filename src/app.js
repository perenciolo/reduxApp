"use strict"
import { createStore } from 'redux';

// IMPORT COMBINED REDUCERS 
import reducers from './reducers/index';

// IMPORT ACTIONS 
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';

// STEP 1 create the Store
const store = createStore(reducers);

store.subscribe(function () {
    console.log('current state is:', store.getState());
    //console.log('current state is:', store.getState()[0].price);
});

// STEP 2 create and dispatch actions
store.dispatch(postBooks([
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
]));

// DELETE 
store.dispatch(deleteBooks({ id: 1 }));

// UPDATE 
store.dispatch(updateBooks({
    id: 2,
    title: "THIS WAS UPDATED"
}));

// -->> CART ACTIONS <<--- //

store.dispatch(addToCart([{ id: 1 }])); 