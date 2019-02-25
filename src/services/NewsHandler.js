class NewsHandler {
	constructor(componentHolder, scrollEventName, APIResource) {
		this.component = componentHolder;
		this.scrollEventName = scrollEventName;
		this.APIResource = APIResource;

		this.component.observer.subscribe(scrollEventName, this.handleScroll.bind(this));
	}

	loadNews(APIDefaultPage) {
		const { nextAPIPage: APIPage, newsList } = this.state;
		this.setState({ isLoading: true }, () => {
			fetch(APIPage || APIDefaultPage).then(res =>
				res.json()
			).then(newsData =>
				this.setState({
					isLoading: false,
					error: false,
					hasMore: (newsData.links.next !== null),
					nextAPIPage: newsData.links.next,
					newsList: [...newsList, ...newsData.results]
				})
			).catch(err => {
				console.error('There was a problem loading the data from the API!');
				this.setState({
					error: err.message,
					isLoading: false,
				});
			});
		});
	}

	handleScroll(event) {
		const scrolledWrapper = event.srcElement;

		const { error, isLoading, hasMore, } = this.component.state;
		if (error || isLoading || !hasMore) return;

		if (scrolledWrapper && (scrolledWrapper.scrollTop >= window.innerHeight)) {
			this.loadNews.bind(this.component, this.APIResource).call();
		}
	}

	static likeArticle(articleId) {
		const APIResource = `http://localhost:8000/news/${articleId}/like`
		return NewsHandler.promisifiedHttp('PATCH', APIResource);
	}

	static retrieveArticle(articleId) {
		const APIResource = `http://localhost:8000/news/${articleId}`;
		return fetch(APIResource);
	}

	static promisifiedHttp(method, url) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.onload = resolve;
			xhr.onerror = reject;
			xhr.send();
		});
	}
}

export default NewsHandler;