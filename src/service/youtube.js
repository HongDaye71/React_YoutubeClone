class Youtube {
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    }

    mostPopular() {          
        return fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`, this.getRequestOptions) 
            .then(response => response.json()) 
            .then(result => result.items) 
    }

    search(query) {
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`, this.getRequestOptions)
        .then(response => response.json())
        .then(result => result.items.map(item => ({...item, id: item.id.videoId})))
        /*
        key warning error: 
        search api사용 시, id가 오브젝트 형태로 들어가있어 비디오가 고유의 key를 갖지 않는다는 warning message가 출력됨
        따라서 setVideos를 통해 result.items을 videos에 넣기 전, item복사 후 id를 추가하는 별도 작업 필요
        */
    }
}

export default Youtube;