import React from 'react';
const NewsItem = (props)=> {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <img src={!imageUrl ? "https://hd.wallpaperswide.com/thumbs/do_or_do_not-t2.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute' }}>
            <span className="badge rounded-pill text-bg-info" >Source:- {source}</span>
          </div>

          <div style={{ margin: '32px 0px 1px 0px' }}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>

    </div >
  )

}

export default NewsItem;
