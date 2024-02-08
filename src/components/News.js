import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90f171d2dbad49f9aebe348bd46f4a47&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })

    this.updateNews();
  }

  handlePreviousBtn = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90f171d2dbad49f9aebe348bd46f4a47&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })

    this.setState({ page: this.state.page - 1 });
    this.updateNews();

  }

  handleNextBtn = async () => {

    // if ( this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize) ) {

    // }

    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90f171d2dbad49f9aebe348bd46f4a47&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true
    //   });

    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page+1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    const { articles, loading } = this.state;
    return (
      <>

        <h1 className="text-center" style={{ margin: '30px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== this.state.totalResults}
          loader={<Spinner />}

        >

          <div className='container'>

            <div className="row">
              {/* { !this.state.loading&& this.state.articles.map((element)=>{ */}

              {articles.length > 0 && articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : "title not available"}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}

            </div>
          </div>

        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePreviousBtn}>Previous</button>
          <h4 style={{ color: 'grey', borderRadius: '50px' }}>  &#8882;-- on which page you wanna go --&#8883; </h4>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextBtn}>Next</button>
        </div> */}
      </>
    )
  }
}

export default News;
