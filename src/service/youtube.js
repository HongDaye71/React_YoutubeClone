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