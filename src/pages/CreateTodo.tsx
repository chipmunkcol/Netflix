import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { Category, todoState } from "../states/todoState"

interface Icategory {
    category: string
}

function CreateTodo({category} : Icategory){

const setTodoList = useSetRecoilState(todoState)
const { register, handleSubmit, setValue } = useForm<{todo : string}>()

const onSubmit = (data: {todo: string}) => {
    setTodoList((prev) => [...prev, {
        id: Date.now(),
        text: data.todo,
        category: category as any
    }])
    setValue('todo',"")
}

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("todo")}/>
            <button>submit</button>
        </form>
    )
}

export default CreateTodo;