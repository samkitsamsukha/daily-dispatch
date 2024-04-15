import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props; //destructuring
    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} height='210px' className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {title} <span className="badge text-bg-danger">{source}</span>
              </h5>
              <p className="card-text">{description}... </p>
              
              <p className="card-text"><small className="text-primary">By {author? author: 'Unknown'} on {new Date(date).toString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
