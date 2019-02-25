
import React, { Component } from 'react';

import NewsHandler from '../../services/NewsHandler';
import NewsCard from '../NewsCard/NewsCard';

//import './MostPopularNewsList.css';

const newsAPI = 'http://localhost:8000/news/popular';

class MostPopularNewsList extends Component {
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
		this.scrollEventSubscribedTopic = 'sideContentWrapperScroll';
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
			<div className="content-box">
				{
					this.state.newsList.map(newsObject => {
						return (
							<NewsCard key={newsObject.id}
								id={newsObject.id}
								imageURL={newsObject.image_url}
								newsTitle={newsObject.title}
								newsDescription={newsObject.description}
								className={`side-bar ${this.props.accessibilityClass}`}
							/>
						);
					})
				}
			</div>
		);
	}
}

export default MostPopularNewsList;