import styles from './search_header.module.css'
import React, {useRef} from 'react';

const SearchHeader = React.memo (({ onSearch }) => {
    const inputRef = useRef();

    const handleSearch = () => {
        const value = inputRef.current.value;
        onSearch(value); //검색 이벤트가 발생하면, onSearch 콜백함수 및 검색된 결과값 호출
    }

    const onClick = () => {
        handleSearch();
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <img className={styles.img} src="./images/logo.png" alt="logo" />
            <h1 className={styles.title}>Youtube</h1>
        </div>
        <input
            ref={inputRef} 
            className={styles.input} 
            type="search" 
            placeholder='Search...' 
            onKeyPress={onKeyPress} 
        />
        <button className={styles.button} type="submit" onClick={onClick}>
            <img className={styles.buttonImg}src="./images/search.png" alt="search" />
        </button>
    </header>
    );
});

export default SearchHeader;

/*
[memo사용 후에도 SearchHeader가 반복적으로 re-render된 이유]
SearchHeader는 App Component에서 props를 받아서 사용한다. App은 Function component로 state 혹은 props가 변경되면 정의해둔 변수가 다시 생성된다. 따라서 SearchHeader는 반복해서 새로운 props를 할당받게 됨으로 memo를 사용하여도 반복해서 re-render가 발생한다.

-> 해결법:
    App에서 SearchHeader에 값을 전달하는 함수에 useCallback사용(+두 번째 인자로 []전달)
    -> 위와 같이 코드를 작성하면, 동일한 오브젝트를 반복해서 사용한다.
    -> useCallback은 한 번 만들면, 메모리 공간을 계속해서 차지하기 때문에 필요한 경우에만 사용
*/