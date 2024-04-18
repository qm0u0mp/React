import React, { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie'

// react-cookie 패키지 (라이브러리)
// - react에서 쿠키를 쉽게 관리할 수 있도록 도움을 주는 라이브러리
// - 쿠키 설정, 검색, 삭제를 간단한 함수로 작업할 수 있도록 함

// npm install react-cookie

export default function ReactCookieLibrary() {

    // useCookies 훅 함수로 쿠키 객체, 쿠키 지정 함수, 쿠키 삭제 함수를 배열로 반환 받음
    const [cookies, setCookie, removeCookie] = useCookies();
    const [key, setKey] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const onKeyChangeHadler = (event : ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
    }
    
    const onValueChangeHadler = (event : ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const onButtonClickHandler = () => {
        // cookies 객체는 브라우저가 가지고 있는 쿠키 정보를 객체로 가져옴
        console.log(cookies);
    }

    const onRegisteButtonClickHandler = () => {
        const now = new Date();
        now.setSeconds(now.getSeconds() + 10);

        // setCookie 함수는 첫번째 매개변수로 name 값 / 두번째 매개변수로 value값 / 세번째 매개변수로 option 지정
        
        // option
        // path - 쿠키를 사용할 수 있는 경로
        // expires - 쿠키 만료 기간
        setCookie(key, value, { path : '/', expires : now});
    }

    const onRemoveButtonClickHandler = () => {
        // removeCookie 함수는 첫번째 매개변수로 name 값 / 두번째 매개변수로 option 지정
        removeCookie(key, { path: '/'});
    }

    return (
        <div>
            <input onChange={onKeyChangeHadler} value={key} />
            <input onChange={onValueChangeHadler} value={value} />

            <button onClick={onButtonClickHandler}>쿠키 확인</button>
            <button onClick={onRegisteButtonClickHandler}>쿠키 등록</button>
            <button onClick={onRemoveButtonClickHandler}>쿠키 삭제</button>
        </div>
    )
}
