import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { checkCookiesPermission, getLastURLPath, getOursPath, showToast } from '../../helper';
import Header from './components/Header';
import BlogFeed from './components/BlogFeed';

const Blog = () => {
    const [newPost, setNewPost] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkCookiesPermission((res) => {
            if (res) {
                navigate('/');
                return;
            }

            const lastPathHistory = getLastURLPath();
            const lastPath = lastPathHistory.LastPath;

            if(!getOursPath().includes(lastPath)) {
                showToast(toast, `Você foi redirecionado, a rota ${lastPath} não existe!`, "warn");
            }

            if (lastPath === "/") {
                showToast(toast, "Bem-Vindo(a)! Sua entrada foi bem-sucedida!", "success");
            }
        });
    }, [navigate]);

    return (
        <div style={{
            backgroundColor: '#1E1E30',
            margin: 0,
            padding: 0,
            border: 'none',
            outline: 'none',
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
        }}>
            <style>
                {`  html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #121212; /* Dark gray background */
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Consistent font */
                }`}
            </style>
            <ToastContainer />
            <Header setNewPost={setNewPost} newPost={newPost}/>
            <BlogFeed newPost={newPost}/>
            {/* <Footer /> Improve footer */}
        </div>
    );
};

export default Blog;
