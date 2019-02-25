import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './MainNewsComponent.css';

import AlertComponent from '../AlertComponent/AlertComponent';
import AccessibilityMenu from '../AccessibilityMenu/AccessibilityMenu';
import MainNewsList from '../MainNewsList/MainNewsList';

class MainNewsComponent extends Component {

	constructor(props) {
		super(props);
		this.observer = this.props.observer;
		this.state = {
			alertBox: {
				type: undefined,
				content: undefined,
				hidden: true,
				timeout: undefined
			}
		};
	}

	handleScroll(event) {
		this.observer.publish('mainContentWrapperScroll', event);
	}

	handleAlert(props) {
		const { type, content, timeout } = props;

		this.setState({
			alertBox: {
				type: type,
				content: content,
				hidden: false,
				timeout: setTimeout(() => {
					this.setState({
						alertBox: {
							type: undefined,
							content: undefined,
							hidden: true,
							timeout: undefined
						}
					})
				}, timeout || 2500)
			}
		});
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.mainContentWrapper).addEventListener('scroll', this.handleScroll.bind(this));
		this.observer.subscribe('alertTriggered', this.handleAlert.bind(this));
	}

	componentWillUnmount() {
		this.observer.unsubscribe('alertTriggered');
		ReactDOM.findDOMNode(this.refs.mainContentWrapper).removeEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<main ref="mainContentWrapper" className={this.props.accessibilityClass}>
				<AlertComponent alertType={this.state.alertBox.type} content={this.state.alertBox.content} hidden={this.state.alertBox.hidden}/>
				<AccessibilityMenu observer={this.observer} accessibilityClass={this.props.accessibilityClass}/>
				<MainNewsList observer={this.observer} accessibilityClass={this.props.accessibilityClass}/>
			</main>
		)
	};
}

export default MainNewsComponent;