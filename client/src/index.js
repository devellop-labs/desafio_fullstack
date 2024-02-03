import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './api/modules/Authentication/Authentication';
import Blog from './api/modules/Blog/Blog';
import Profile from './api/modules/Profile/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile tabIndex={0}/>} />
        <Route path="/profile/myposts" element={<Profile tabIndex={1}/>} />
        <Route path="/profile/historic" element={<Profile tabIndex={2}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
