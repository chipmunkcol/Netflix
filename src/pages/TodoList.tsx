import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { atom } from "recoil"



function TodoList(){

interface Itodo {
    text: string;
    category: "DONE" | "TO_DO"
}
const todoState = atom<Itodo[]>({
    key: 'todoState',
    default: []
})


const [todoList, setTodoList] = useRecoilState(todoState)
console.log('todoList: ', todoList);

const { register, handleSubmit, setValue } = useForm<{todo : string}>()

const onSubmit = (data: {todo: string}) => {
    setTodoList((prev) => [...prev, {
        text: data.todo,
        category: "TO_DO"
    }])
    setValue('todo',"")
}

    return(
        <Wrap>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("todo")}/>
                <button>submit</button>
            </form>
            {todoList.map( todo => <div>{todo.text}</div> )}
        </Wrap>
    )
}

export default TodoList;

const Wrap = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
