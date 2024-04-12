import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

	static defaultProps = {
		country: 'in',
		pageSize: 9,
		category: 'general'

	}
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string
	}
	// Constructor to initialize the component's state
	constructor() {
		super();
		// Log a message when the constructor is called
		// console.log("Hello, I am constructor from new component");
		// Initialize state with empty articles array, loading set to true, and page set to 1
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	// Lifecycle method: Runs after the component is rendered to the DOM
	async componentDidMount() {
		// Fetch news data from the API
		let url =
			`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=1&pagesize=${this.props.pageSize}`;
		this.setState({loading: true});
		let data = await fetch(url);
		// Parse the response into JSON format
		let parsedData = await data.json();
		// Log the parsed data
		// console.log(parsedData);
		// Update the state with the fetched articles and total results
		this.setState({ 
      		articles: parsedData.articles,
      		totalResults: parsedData.totalResults,
			loading: false
    	});
	}

	// Method to handle clicking on the "Next" button
	handleNextClick = async () => {
		console.log("next");
    	// Check if there are more pages to load
    	if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    	}
    	else{
      		// Construct URL for the next page of news
      		let url =
				`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
			this.setState({loading: true});
			// Fetch news data for the next page
			let data = await fetch(url);
			// Parse the response into JSON format
			let parsedData = await data.json();
			
			// Log the parsed data
			console.log(parsedData);
			// Update the state with the fetched articles for the next page and increment the page number
			this.setState({
				page: this.state.page + 1,
				loading: false,
				articles: parsedData.articles
			});
    	}	
	};

	// Method to handle clicking on the "Previous" button
	handlePreviousClick = async () => {
		console.log("prev");
    	// Construct URL for the previous page of news
    	let url =
			`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
		this.setState({loading: true});
		// Fetch news data for the previous page
		let data = await fetch(url);
		// Parse the response into JSON format
		let parsedData = await data.json();
		// Log the parsed data
		console.log(parsedData);
		// Update the state with the fetched articles for the previous page and decrement the page number
		this.setState({
			page: this.state.page - 1,
			loading: false,
			articles: parsedData.articles
		});
	};

	// Render method to display the component's UI
	render() {
		return (
			<div className="container my-3 ">
				<h1 className="my-3 text-center">Daily Dispatch: Top headlines</h1>
				{this.state.loading && <Spinner />}
				<div className="row">
					{/* Map over the articles array and render a NewsItem component for each article */}
					{!this.state.loading && this.state.articles.map((element) => {
						return (
							<div key={element.url} className="col-md-4">
								<NewsItem
									title={element.title ? element.title.slice(0, 55) : ""}
									description={
										element.description ? element.description.slice(0, 120) : ""
									}
									imageUrl={
										element.urlToImage
											? element.urlToImage
											: "https://www.ntu.ac.uk/__data/assets/image/0026/271817/Default-news.jpg"
									}
									newsUrl={element.url}
									author={element.author}
									date={element.publishedAt}
									source={element.source.name}
								/>
							</div>
						);
					})}
				</div>
				{/* Navigation buttons for previous and next pages */}
				<div className="container d-flex justify-content-between">
					<button
						disabled={this.state.page <= 1}
						type="button"
						className="btn btn-primary"
						onClick={this.handlePreviousClick}
					>
						&larr; Previous
					</button>
					<button
						disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
						type="button"
						className="btn btn-primary"
						onClick={this.handleNextClick}
					>
						Next &rarr;
					</button>
				</div>
			</div>
		);
	}
}

export default News;