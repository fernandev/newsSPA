import React, { Component, Fragment } from 'react';
import ReactObserver from 'react-event-observer';


import './App.css';

import MainNewsComponent from './components/MainNewsComponent/MainNewsComponent';
import MostPopularNewsComponent from './components/MostPopularNewsComponent/MostPopularNewsComponent';


class App extends Component {
	constructor() {
		super();
		this.observer = ReactObserver();

		this.darkModeClassList = {
			true: 'dark',
			false: 'light'
		};

		this.state = {
			accessibilityClass: this.darkModeClassList[(localStorage.getItem('prefersNightMode') === 'true')]
		};
	}

	componentDidMount() {
		this.observer.subscribe('nightModeToggle', enabled => {
			this.setState({
				accessibilityClass: this.darkModeClassList[enabled]
			});
		});
	}

	componentWillUnmount() {
		this.observer.unsubscribe('nightModeToggle');
	}

	render() {
		return (
			<Fragment>
				<MainNewsComponent observer={this.observer} accessibilityClass={this.state.accessibilityClass}/>
				<MostPopularNewsComponent observer={this.observer} accessibilityClass={this.state.accessibilityClass}/>
			</Fragment>
		);
	}
}

export default App;
