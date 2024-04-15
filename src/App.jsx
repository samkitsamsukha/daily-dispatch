import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* Adding the key facilitates remounting of category specific news */}
            <Route exact path="*" element={<Navigate to="/"/>}/>
            <Route exact path='/' element={<News apiKey={this.apiKey} key="general" pageSize={12} country="in" category="general"/>}/>
            <Route exact path='/business' element={<News apiKey={this.apiKey} key="business" pageSize={12} country="in" category="business"/>}/>
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} key="entertainment" pageSize={12} country="in" category="entertainment"/>} />
            <Route exact path='/general' element={<News apiKey={this.apiKey} key="general" pageSize={12} country="in" category="general"/>} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} key="health" pageSize={12} country="in" category="health"/>} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} key="science" pageSize={12} country="in" category="science"/>} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} key="sports" pageSize={12} country="in" category="sports"/>} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} key="technology" pageSize={12} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}
