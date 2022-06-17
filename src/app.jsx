import { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import VideoDetail from './components/video_detail/video_detail';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = video => {
    setSelectedVideo(video);
  }

  const search = useCallback(query => {
    youtube
      .search(query)
      .then(videos => 
        setVideos(videos));
        setSelectedVideo(null);
  },[]);

  useEffect(()=> {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, []);

  return (
  <div className={styles.app}>
    <SearchHeader onSearch={search}/> 
    <section className={styles.content}>
    {selectedVideo && (
      <div className={styles.detail}>
        <VideoDetail video={selectedVideo} />
      </div>
    )}
      <div className={styles.list}>
        <VideoList 
          videos={videos} 
          onVideoClick={selectVideo}
          display={selectedVideo ? 'list' : 'grid'}
        />
      </div>
    </section>
  </div>
  );
}

export default App;


/*
useState: React Hook에서 Component와 같은 State를 정의하기 위해 사용
  -> useState사용법
    -> const [데이터를 저장할 변수, 변수를 업데이트 할 수 있는 변수선언] = useState([]);
useEffect: React Hook에서 Component와 같은 Render를 정의하기 위해 사용
  -> []를 통해 useState에서 호출한 변수를 입력하면, 해당 변수에서 update가 발생할 때 Callback함수를 실행시킴
  -> 아무것도 전달하지 않으면, 모든 State변수에서 update가 발생할 때 마다 Callback함수를 실행시킴

[var / let / const]
var: 동일한 이름의 변수선언 가능 (유연하다는 장점이 있으나, 규모있는 프로젝트 진행 시 혼란이 생길 수 있음)
let: 선언된 변수에 다른 값 할당 가능 (ex. let name = 'Ellie', name = 'Daye')
const: 동일한 이름의 변수선언 불가능 / 선언된 변수에 다른 값 할당 불가능

[JSON]
JavaScript Object Notationd의 약자로, 데이터를 저장하거나 전송할 때 사용되는 경량의 DATA교환 방식이다.

[CSS를 작성하는 방법들]
React에서는 Componenet를 이용하기 때문에 Componenet간 의존성을 최소화하고 내부 응집도를 높히는 게 좋다.
따라서 css-module과 css-in-js로 JS를 이용해 css를 만드는게 좋다.
1. css
2. scss
  -> css와 비슷하지만, 별도의 문법을 통해 재사용성을 높일 수 있다.
3. css-module
  -> 클래스명이 충돌하는 단점을 극복할 수 있으므로 간결한 클래스명을 이용하여 컴포난트 단위로 스타일을 적용할 때 용이하다.
    -> ex. 두 개의 button을 만들고, css에서 두 개의 button 스타일을 다르게 지정하려면 충동을 피하기 위해 className을 button1, button2로 지정해야 한다. 하지만 css-module을 사용하여 각 컴포넌트가 하나의 css를 갖는다면 동일한 변수명을 사용하더라도 두 개 버튼에 서로 다른 스타일을 지정할 수 있다.
4. css-in-js
  -> css코드를 자바스크립트 파일 안에서 작성한다. 내부 응집도가 높으며 동적으로 css를 변경하기에 용이하다

[module]
모듈: 소프트웨어 설계에서 기능단위로 분해하여 재사용 가능한 수준으로 만들어진 단위
모듈화: 시스템의 디버깅, 통합 및 수정을 용이하도록 하는 소프트웨어 설계 기법

[MVC(Model View Controller)]
MVC등의 App 디자인 패턴 목표는 세부적으로 역할을 나누어 한 가지의 responsibility를 갖도록 하는 것이다.
React는 View를 담당하므로 단순히 사용자에게 데이터를 보여주고 이벤트를 처리하는 View에 관련된 것들만을 담당해야 한다.
React에서 네트워크 통신, 비즈니스 로직처리 등을 모두 처리하는 것을 부적절하다.

-> Postman의 JavaScript-Fetch를 그대로 복붙해서 함수에 넣었을 때 문제점
  1. Private으로 관리되어야 하는 Key가 코드 내 노출되어 있다
  2. Component안에 네트워크 통신 로직이 들어있다

[Etc.]
두 가지 컴포넌트 return시에는 (<></>)로 묶어주는 것 필요
*/
