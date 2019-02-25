
import React, { Component, Fragment } from 'react';
import renderHTML from 'react-render-html';

import ArticleAccessibilityMenu from '../ArticleAccessibilityMenu/ArticleAccessibilityMenu';
import NewsHandler from '../../services/NewsHandler';
import './Article.css';

class Article extends Component {

	constructor(props) {
		super(props);
		this.state = {
			articleId: props.match.params.id,
			image_url: '',
			author: '',
			created_at: '',
			origin: '',
			likes: '',
			title: '',
			description: '',
			content: ''
		};
	}

	componentWillMount() {
		this.loadArticle.bind(this).call();
	}

	loadArticle(articleId) {
		NewsHandler.retrieveArticle(this.state.articleId).then(data =>
			data.json()
		).then(APIData => {
			this.setState({
				image_url: APIData.image_url,
				author: APIData.author,
				created_at: APIData.created_at,
				origin: APIData.country_origin,
				likes: APIData.likes,
				title: APIData.title,
				description: APIData.description,
				content: APIData.content
			});
		});
	}

	render() {
		return (
			<Fragment>
				<ArticleAccessibilityMenu/>
				<article className="wrapper">
					<figure className="article-image" style={{backgroundImage: `url(${this.state.image_url}`}}></figure>
					<section className="article-data">
						<div className="author-data">
							<div className="author-name">
								<i className="fas fa-user-edit"></i>
								<span>{this.state.author}</span>
							</div>
							<div className="news-origin">
								<i className="fas fa-globe-europe"></i>
								<span>{this.state.origin}</span>
							</div>
							<div className="news-date">
								<i className="far fa-calendar-alt"></i>
								<span>{new Date(this.state.created_at).toLocaleDateString()}</span>
							</div>
							<div className="news-likes">
								<i className="far fa-thumbs-up"></i>
								<span>{this.state.likes}</span>
							</div>
						</div>
						<h1 className="article-title">{this.state.title}</h1>
						<summary className="article-description">
							<h2>{this.state.description}</h2>
						</summary>
						<div className="article-content">
							{renderHTML(this.state.content)}
						</div>
					</section>
				</article>
			</Fragment>
		);
	}
}

export default Article;