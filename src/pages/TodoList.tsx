import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { atom } from "recoil"
import { categoryTodo, Itodo, todoState } from "../states/todoState";
import Todo from "./Todo";



function TodoList(){

const setTodoList = useSetRecoilState(todoState)
const [TODO, DONE] = useRecoilValue(categoryTodo)
console.log('TODO, DONE: ', TODO, DONE);

const { register, handleSubmit, setValue } = useForm<{todo : string}>()

const onSubmit = (data: {todo: string}) => {
    setTodoList((prev) => [...prev, {
        id: Date.now(),
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
            
            {TODO.map(todo => <Todo key={todo.id} {...todo}/>)}
            {DONE.map(todo => <Todo key={todo.id} {...todo}/>)}

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
