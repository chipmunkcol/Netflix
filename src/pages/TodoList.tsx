import { useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import { Category, categoryState, categoryTodo } from "../states/todoState";
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { useState } from "react";


function TodoList(){

const TODO = useRecoilValue(categoryTodo)
const [category, setCategory] = useRecoilState(categoryState)

return(
        <Wrap>
            <select 
            onChange={(e)=>setCategory(e.target.value)}
            >
                <option defaultValue={Category.TO_DO}>TO_DO</option>
                <option value={Category.DONE}>DONE</option>
            </select>


            <CreateTodo category={category}/>
            
            {TODO?.map(todo => <Todo key={todo.id} {...todo}/>)}

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
