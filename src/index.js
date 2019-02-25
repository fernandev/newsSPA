import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Article from './components/Article/Article';

import './index.css';

ReactDOM.render(
	(<BrowserRouter >
		<Switch>
			<Route path="/news" component={App} exact/>
			<Route path="/news/article/:id" component={Article}/>
		</Switch>
	</BrowserRouter>),
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
