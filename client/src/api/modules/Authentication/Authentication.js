import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false);

  return !isLogin ?
    <Login onSwitch={() => setIsLogin(true)} /> :
    <Register onSwitch={() => setIsLogin(false)} />;
};

export default Authentication;
