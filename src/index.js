import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import Youtube from './service/youtube';

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App youtube={youtube}/>
  </React.StrictMode>
);

reportWebVitals();


/*
Private Key 설정
1. dotenv설치
2. .env파일 생성 후 key입력
  -> .env파일은 프로젝트 최상단 생성
3. .env파일을 git업로드에서 제외  
  -> 프로젝트 내 gitignore파일 -> .env입력
*/