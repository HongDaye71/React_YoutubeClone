import React from 'react';
import styles from './video_detail.module.css'

const videoDetail = ({video}) => (
    <section className={styles.detail}>
        <iframe 
            className={styles.video}
            type="text/html" 
            title="youtube video player"
            width="100%" 
            height="500px"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0" 
            allowFullScreen>
        </iframe>
        <h2>{video.snippet.title}</h2>
        <h3>{video.snippet.channeltitle}</h3>
        <pre className={styles.description}>{video.snippet.description}</pre>
    </section>
);

export default videoDetail;

/*
[iframe player api]
https://developers.google.com/youtube/youtube_player_demo

[<p>와 <pre>]
공통점: 글을 쓰기 위한 태그
차이점: p태그는 1개까지의 띄어쓰기만 적용되고, 줄바꿈은 적용되지 않는다. p태그에 줄바꿈을 넣으려면 <br>태그를 넣어주어야 한다. 하지만 pre태그를 쓰면 띄어쓰기와 줄바꿈이 그대로 적용된다. 

pre태그 문제점: 줄바꿈 미설정 시, 글이 길어지면 item에 설정된 범위를 자동으로 늘려가며 글을 작성한다. 이는 css설정을 통해 해결해야 한다.
*/