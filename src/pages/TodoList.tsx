import { useState } from "react";
import styled from "styled-components";

function TodoList(){

const [text, setText] = useState('')
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text)
}
    return(
        <Wrap>
            <form onSubmit={onSubmit}>
                <input 
                placeholder="write hello, world"
                onChange={e => setText(e.target.value)}
                value={text}
                /> 
                <button type="submit">Submit 버튼</button>
            </form>
            
        </Wrap>
    )
}

export default TodoList;

const Wrap = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`
