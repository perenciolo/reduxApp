"use strict"
// REACT
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// REACT-ROUTER 
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// REDUX
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
import BooksForm from './components/pages/booksform';
import Cart from './components/pages/cart';
import Main from './main';

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
);

render(
    Routes, document.getElementById('app')
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