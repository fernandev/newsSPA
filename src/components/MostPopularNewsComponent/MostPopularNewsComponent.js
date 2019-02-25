
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './MostPopularNewsComponent.css';

import MostPopularNewsList from '../MostPopularNewsList/MostPopularNewsList';

class MostPopularNewsComponent extends Component {
	constructor(props) {
		super(props);
		this.observer = this.props.observer;
	}

	handleScroll(event) {
		this.observer.publish('sideContentWrapperScroll', event);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.sideContentWrapper).addEventListener('scroll', this.handleScroll.bind(this));
	}

	componentWillUnmount() {
		ReactDOM.findDOMNode(this.refs.sideContentWrapper).removeEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<aside ref="sideContentWrapper" className={this.props.accessibilityClass}>
				<MostPopularNewsList observer={this.observer} accessibilityClass={this.props.accessibilityClass}/>
			</aside>
		);
	}
}

export default MostPopularNewsComponent;