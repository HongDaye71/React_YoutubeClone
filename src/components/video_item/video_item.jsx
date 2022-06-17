import React from 'react';
import styles from './video_item.module.css';

const VideoItem = ({video, video: {snippet}, onVideoClick, display}) => {
    const displayType = display === 'list' ? styles.list : styles.grid;

    return (
    <li className={`${styles.container} ${displayType}`} onClick={()=> onVideoClick(video)}>
        <div className={styles.video}>
            <img 
                className={styles.thumbnails}
                src={snippet.thumbnails.medium.url} 
                alt="video thumbnail"/>
            <div>
            <p className={styles.title}>{snippet.title}</p>
            <p className={styles.channel}>{snippet.channelTitle}</p>
            </div>
        </div>
    </li>
    );
}

export default VideoItem;

/*
props.video.snippet을 반복해서 사용하지 않는 방법:
1. const VideoItem = ({ video }) => ();
    -> props안 오브젝트와 동일한 변수명을 넣어주면, props안 세부 오브젝트를 받아올 수 있다.
    -> ({video : videoItem}): props안 video오브젝트를 받아와 videoItem이라는 이름으로 사용
    -> ({ video: { snippet }}): props-> video-> snippet 이라는 props안 세부 오브젝트를 받아옴
*/