import React, { useEffect } from 'react';
import Header from '../Blog/components/Header';
import { Container, Typography, Box, Button } from '@mui/material';
import { checkCookiesPermission, getLastURLPath } from '../../helper';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
      checkCookiesPermission((res) => {
          if (res) {
              navigate('/');
              return;
          }
          getLastURLPath();

          navigate('/blog');
      });
  }, [navigate]);

  return (
    <div>
      <style>
        {`  html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #121212;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }`}
      </style>
      <Header />
    </div>
  );
}

export default NotFoundPage;
