import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import EditorPage from './EditorPage';
import BlogPage from './BlogPage';
import LoginPage from './LoginPage';

ReactDOM.render(
  <BrowserRouter>
    <HomePage />
    <EditorPage/>
    <BlogPage/>
    <LoginPage/>
  </BrowserRouter>,
  document.getElementById('root')
);
