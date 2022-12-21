import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryTodo, Itodo, todoState } from "../states/todoState";


function Todo({id, text, category}:Itodo){
    
const setTodoList = useSetRecoilState(todoState)

const onClickTodo = () => {
    setTodoList(prev => prev.map((oldTodo) => {
        if(oldTodo.id === id) {
          return {id, text, category:"DONE"}
        }
        return oldTodo;
        })
    )
}
const onClickDone = () => {
    setTodoList(prev => prev.map((oldTodo) => {
        if(oldTodo.id === id) {
            return {id, text, category:"TO_DO"}
        }
        return oldTodo;
    }))
}

    return(
        <Wrap>
            { category === "TO_DO" ? 
            (<TodoBox todo={category==="TO_DO"}>
                <h1>{text}</h1>
                <button onClick={onClickTodo}>{category}</button>
            </TodoBox>) : 
            (<DoneBox>
                <h1>{text}</h1>
                <button onClick={onClickDone}>{category}</button>
            </DoneBox>)}
            
        </Wrap>
    )
}

export default Todo;

const Wrap = styled.div`
display: flex;

`
const TodoBox = styled.div<{todo: boolean}>`
width: 15rem;
border: 2px solid teal;
`
const DoneBox = styled.div`
width: 15rem;
border: 2px solid tomato;
`
