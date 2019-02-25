
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArticleAccessibilityMenu extends Component {
	render() {
		return (
			<div className="back-button">
				<NavLink to="/news">
					<i className="fas fa-long-arrow-alt-left"></i>
				</NavLink>
				<span>Main page</span>
			</div>
		);
	}
}

export default ArticleAccessibilityMenu;