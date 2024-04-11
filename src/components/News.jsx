import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
	constructor() {
		super();
		console.log("Hello, I am constructor from new component");
		this.state = {
			articles: [],
			loading: true,
			page: 1,
		};
	}

	async componentDidMount() {
		//will run after render
		let url =
			"https://newsapi.org/v2/top-headlines?country=in&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=1";
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log(parsedData);
		this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
	}

	handleNextClick = async () => {
		console.log("next");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url =
			`https://newsapi.org/v2/top-headlines?country=in&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=${this.state.page + 1}&pagesize=20`;
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log(parsedData);
		this.setState({ articles: parsedData.articles });

		this.setState({
			page: this.state.page + 1,
		});
    }
		
	};

	handlePreviousClick = async () => {
		console.log("prev");

    let url =
			`https://newsapi.org/v2/top-headlines?country=in&apiKey=385735f1ff6f4f2d8991fe9eef5abbf2&page=${this.state.page - 1}&pagesize=20`;
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log(parsedData);
		this.setState({ articles: parsedData.articles });

		this.setState({
			page: this.state.page - 1,
		});

	};

	render() {
		return (
			<div className="container my-3 ">
				<h1 className="my-3">Daily Dispatch: Top headlines</h1>

				<div className="row">
					{this.state.articles.map((element) => {
						return (
							<div key={element.url} className="col-md-4">
								<NewsItem
									title={element.title ? element.title.slice(0, 45) : ""}
									description={
										element.description ? element.description.slice(0, 88) : ""
									}
									imageUrl={
										element.urlToImage
											? element.urlToImage
											: "https://www.ntu.ac.uk/__data/assets/image/0026/271817/Default-news.jpg"
									}
									newsUrl={element.url}
								/>
							</div>
						);
					})}
				</div>
				<div className="container d-flex justify-content-between">
					<button
						disabled={this.state.page <= 1}
						type="button"
						className="btn btn-dark"
						onClick={this.handlePreviousClick}
					>
						&larr; Previous
					</button>
					<button
						type="button"
						className="btn btn-dark"
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
