"use strict"
// REACT
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';

// STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// COMPONENTS 
import BooksList from './components/pages/bookslist';
import Menu from './components/menu';
import Footer from './components/footer';

render(
    <Provider store={store}>
        <div>
            <Menu />
            <BooksList />
            <Footer />
        </div>
    </Provider>, document.getElementById('app')
);

/*
// STEP 2 create and dispatch actions
store.dispatch(postBooks(
    [{
        id: 1,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 33.33
    },
    {
        id: 2,
        title: 'this is the second book title',
        description: 'this is the second book description',
        price: 50
    }]
))
*/