import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './api/modules/Authentication/Authentication';
import Blog from './api/modules/Blog/Blog';
import Profile from './api/modules/Profile/Profile';
import NotFoundPage from './api/modules/NotFoundPage/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/desafio_fullstack">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile tabIndex={0}/>} />
        <Route path="/profile/myposts" element={<Profile tabIndex={1}/>} />
        <Route path="/profile/historic" element={<Profile tabIndex={2}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
