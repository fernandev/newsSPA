import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import DateUtil from '../../util/Date';
import NewsHandler from '../../services/NewsHandler';

import './NewsCard.css';

class NewsCard extends Component {

	constructor(props) {
		super(props);
		this.observer = this.props.observer;
		this.state = {
			isLiked: false,
			likes: this.props.newsLikes
		};
	}

	approximateDate(dateStr) {
		const curDate = new Date();
		const articleDate = new Date(dateStr);

		const dateDiffMap = DateUtil.differenceBetweenDates(articleDate, curDate);

		let datePart, datePartValue;
		dateDiffMap.forEach((value, key) => {
			if (value > 0) { //Grab greatest entry previously sorted by datepart (asc).
				datePart = key.charAt(0).toLowerCase();
				datePartValue = value;
			}
		});
		return `${datePartValue}${datePart} ago`;
	}

	handleLike(event) {
		event.preventDefault();

		if (!this.state.isLiked) {
			NewsHandler.likeArticle(this.props.id).then(response => {
				this.setState((prevState, props) => ({
					likes: prevState.likes + 1,
					isLiked: true
				}));
				localStorage.setItem(`article-${this.props.id}-liked`, true);
				this.observer.publish('alertTriggered', {
					type: 'success',
					content: 'Your like was submitted successfully!',
					timeout: 4000
				});
			}).catch(err => {
				this.observer.publish('alertTriggered', {
					type: 'error',
					content: 'There was an error processing your request!',
					timeout: 5000
				});
			});
		} else {
			this.observer.publish('alertTriggered', {
				type: 'warn',
				content: 'Your like was already submitted!',
				timeout: 3000
			});
		}
	}

	render() {
		return (
			<section className={`news-content ${this.props.className || ''}`}>
				<NavLink to={`/news/article/${this.props.id}`}>
					<div className={`news-heading ${this.props.className || ''}`}>
					{
						<div style={{backgroundImage: `url(${this.props.imageURL})`}} className={`news-img ${this.props.className || ''}`}></div>
					}
					{
						this.state.likes >= 0 &&
							<p className={`news-popularity ${this.props.className || ''}`}>
								<i className={`${(this.state.isLiked)? 'fas': 'far'} fa-heart ${this.props.className || ''}`} onClick={this.handleLike.bind(this)}></i>
								{this.state.likes}
							</p>
					}
					</div>
					<div className={`news-body ${this.props.className || ''}`}>
						<h1 className={`news-title ${this.props.className || ''}`}>{this.props.newsTitle}</h1>
						<h2 className={`news-description ${this.props.className || ''}`}>{this.props.newsDescription}</h2>
					</div>
					{
						this.props.newsOrigin && this.props.newsCreatedAt &&
						<div className={`news-footer ${this.props.className || ''}`}>
							<div className={`news-data ${this.props.className || ''}`}>
								<i className={`fas fa-globe-americas ${this.props.className || ''}`}></i>
								<span>{this.props.newsOrigin}</span>
							</div>
							<div className={`news-data ${this.props.className || ''}`}>
								<i className={`fas fa-clock ${this.props.className || ''}`}></i>
								<span>{this.approximateDate(this.props.newsCreatedAt)}</span>
							</div>
						</div>
					}
				</NavLink>
			</section>
		);
	}
}

export default NewsCard;