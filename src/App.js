import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  pagesize = 21;
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0,
  }

  // Define setProgress as a method within the class
  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>

          <NavBar/>
          <LoadingBar
            height= {3}
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>

            {/* Pass setProgress as a prop */}a
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pagesize} country='in' category='health' />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pagesize} country='in' category='business' />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pagesize} country='in' category='entertainment' />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pagesize} country='in' category='general' />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pagesize} country='in' category='health' />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pagesize} country='in' category='science' />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pagesize} country='in' category='sports' />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pagesize} country='in' category='technology' />}></Route>

          </Routes>

        </Router>
      </div>
    );
  }
}
