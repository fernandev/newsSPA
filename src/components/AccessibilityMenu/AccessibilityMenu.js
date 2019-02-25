
import React, { Component } from 'react';
import './AccessibilityMenu.css';

const nightModeLocalStorageKey = 'prefersNightMode';
class AccessibilityMenu extends Component {
	constructor(props) {
		super(props);
		this.observer = this.props.observer;
		this.isUsingNightMode = (localStorage.getItem(nightModeLocalStorageKey) === 'true');
	}

	toggleNightMode() {
		this.isUsingNightMode = !this.isUsingNightMode;
		localStorage.setItem(nightModeLocalStorageKey, this.isUsingNightMode);

		this.observer.publish('nightModeToggle', this.isUsingNightMode);
	}

	render() {
		return (
			<div className={`${this.props.accessibilityClass || ''} page-header`}>
				<label className={`${this.props.accessibilityClass || ''} switch label-toggle`}>
					<input type="checkbox" id="togBtn" onClick={this.toggleNightMode.bind(this)} defaultChecked={this.isUsingNightMode} className={this.props.accessibilityClass}/>
						<div className={`${this.props.accessibilityClass || ''} slider round`}></div>
				</label>
			</div>
		);
	}
}

export default AccessibilityMenu;