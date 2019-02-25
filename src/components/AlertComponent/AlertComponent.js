import React, { Component } from 'react';
import './AlertComponent.css';

class AlertComponent extends Component {

	render() {
		return (
			<div ref="alertBox" className={`alert ${this.props.alertType || 'info'} ${(this.props.hidden)? 'hidden': ''}`}>
				{this.props.content}
			</div>
		);
	}
}

export default AlertComponent;