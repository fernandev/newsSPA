
import React, { Component } from 'react';

import './MainNewsList.css';

import NewsCard from '../NewsCard/NewsCard';
import NewsHandler from '../../services/NewsHandler';

const newsAPI = 'http://localhost:8000/news/recent';

class MainNewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsList: [],
			error: false,
			isLoading: false,
			hasMore: true,
			nextAPIPage: undefined
		};
		this.observer = props.observer;
		this.scrollEventSubscribedTopic = 'mainContentWrapperScroll';
		this.newsHandler = new NewsHandler(this, this.scrollEventSubscribedTopic, newsAPI);
	}

	componentDidMount() {
		this.newsHandler.loadNews.bind(this, newsAPI).call();
	}

	componentWillUnmount() {
		this.observer.unsubscribe(this.scrollEventSubscribedTopic);
	}

	render() {
		return (
			<div className="content-box" ref="mainContentBox">
				<div className="page-heading">
					<h1 className={`page-title ${this.props.accessibilityClass || ''}`}>News</h1>
				</div>
				{
					this.state.newsList.map(newsObject => {
						return (
							<NewsCard key={newsObject.id}
								id={newsObject.id}
								imageURL={newsObject.image_url}
								newsLikes={newsObject.likes}
								newsTitle={newsObject.title}
								newsDescription={newsObject.description}
								newsOrigin={newsObject.country_origin}
								newsCreatedAt={newsObject.created_at}
								className={this.props.accessibilityClass || ''}
								observer={this.observer}
							/>
						);
					})
				}
			</div>
		);
	}
}

export default MainNewsList;