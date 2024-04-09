import React, { ChangeEvent, useState } from 'react'

// 상태(status)
// - 각각의 컴포넌트가 가지는 데이터
// - 컴포넌트의 렌더링 결과에 영향을 미침
// - 컴포넌트는 독릭적인 상태를 가질 수 있음
// - 상태가 변경되면 컴포넌트가 리렌더링 됨
export default function StateComponent() {

    // status 선언
    // - useState 함수로 함수를 선언할 수 있음
    // - const [상태변수, 상태변경함수] = useState<상태변수타입>(초기값);

    //  let count = 0;
    const [count, setCount] = useState<number>(0);

    // let total: number = 0;
    const[total, setTotal] = useState<number>(0);

    // let favorites : string[] = [];
    const[favorites, setFavorites] = useState<string[]>(['사과']);
    const[favorite, setFavorite] = useState<string>('');

    const onCountAddHandler = () => {
        // setCount(count + 1);

        // 상태변수는 반드시 상태 변경함수로 변경해야 리렌더링됨
        // count++; => const로 선언된 상수라서 변경 불가

        // 상태변경 함수를 통해서 함수를 변경한다고 바로 적용되지 않음
        // 리렌더링된 후 상태변경 함수가 적용됨
        // 밑의 코드와 같이 입력했을 시, 결과가 0,0,0 / 1,1,1 이런 식으로 나옴
        // 덮어씌운다고 생각하면 되는데, 제일 마지막 함수에 덮어씌어짐
        /*
            setCount(count + 1);
            console.log(count);
            setCount(count + 1);
            console.log(count);
            setCount(count + 1);
            console.log(count);
        */

        // 상태변경 함수에 콜백 함수를 전달하면 해당 콜백 함수는 상태 변경 작업을 누적하여 결과를 반환함
        // 위의 함수와 다르게 한 단계씩 동작하면서 저장 => 결과가 누적되어 다 더해진 값이 나오게 됨
        /*
            setCount((count) => count + 1);
            console.log(count);
            setCount((count) => count + 1);
            console.log(count);
            setCount((count) => count + 1);
            console.log(count);
            setCount(count + 1);
        */

        // 변경된 상태를 사용하고 싶을 때 해결방법, 임시 변수를 사용하여 간접 사용
        const tmp = count + 1;
        setCount(tmp + 1);
        setTotal(total + tmp);
    }
    
    // 인풋 요소에 값을 가져오고자 할 땐 onChangeEvent의 .target.value로 가져옴
    const onInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // alert(event.target.value); => 인풋창에 입력한 value 값들이 어럴트 창으로 보여짐
        
        // 가져온 target.value 값을 상태에 지정
        setFavorite(event.target.value);
    }

    const onAddListHandler = () => {
        // 상태가 배열 혹은 객체이면 요소를 각각에 대해 요소를 추가, 변경이 일어나도 상태가 변경된 것으로 인식하지 않음 => 실제 주소 변경이 일어나지 않았기 때문
        // 상태가 변경된 것도 인식하게 하고 싶으면 새로운 배열 혹은 객체를 생성하여 상태를 변경해야함 => 일반적으로 복사해서 변경함

        // 인풋창에 요소 입력하고 추가버튼 클릭 시 요소 바로 추가
        // favorites.push(favorite);
        // console.log(favorites);
        // const newFavorites = favorites.map(item => item);
        // setFavorites(newFavorites);

        setFavorites([...favorites, favorite]); // ...를 사용하여 입력한 favorites에 대한 값들이 차례로 저장됨
        setFavorite(''); // h4에 보이던 입력 값이 추가버튼 클릭과 동시에 사라짐
    }

    return (
        <>
            <button onClick={onCountAddHandler}>+</button>
            <h1>{count}</h1>
            <h1>{total}</h1>

            <hr />

            Input이 만약 상태를 변경한다면 value로 그 상태를 지정해야 불일치가 발생하지 않음
            <br /> 인풋태그에 그에 맞는 value를 지정해야 값 추가 시 인풋창의 상태도 변경됨
            <br />
            <input onChange={onInputHandler} value={favorite} />
            <button onClick={onAddListHandler}>추가</button>
            <h4>{favorite}</h4>
            <ul>
                {favorites.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </>
    )
}
