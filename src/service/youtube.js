class Youtube {
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    async mostPopular() {          
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`, this.getRequestOptions);
        const result_1 = await response.json();
        return result_1.items; 
    }

    async search(query) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`, this.getRequestOptions);
        const result_1 = await response.json();
        return result_1.items.map(item => ({ ...item, id: item.id.videoId }));
        /*
        key warning error: 
        search api사용 시, id가 오브젝트 형태로 들어가있어 비디오가 고유의 key를 갖지 않는다는 warning message가 출력됨
        따라서 setVideos를 통해 result.items을 videos에 넣기 전, item복사 후 id를 추가하는 별도 작업 필요
        */
    }
}

export default Youtube;

/*
[Axios]
위와 같이 fetch Web APIs를 사용하여 코드를 작성하게 되면, 가독성이 떨어진다는 문제가 있다.
Axios라이브러리는 가독성을 높이기 위해 사용되는 라이브러리로 아래와 같이 코드 작성이 가능하다.

*Axios는 데이터를 JSON으로 변환하여 출력하므로 fetch Web APIs와 같은 변환과정이 생략 가능하다.

==============================================================================================
import axios from 'axios'; 

class Youtube {
    constructor(key) {
        this.youtube = axios.create({
            baseURL: "https://youtube.googleapis.com/youtube/v3",
            params: {key: key}
        })`
    }
}

async mostPopular() {
    const responsen = await this.youtube.get('videos', {
        params: {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 25,
        },
    });
    return response.data.items;
}         
==============================================================================================
*/