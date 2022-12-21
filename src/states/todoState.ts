import { atom, selector } from "recoil";

export interface Itodo {
    id: number;
    text: string;
    category: "TO_DO"|"DONE";
}

export const todoState = atom<Itodo[]>({
    key:`todoState${Date.now()}`,
    default: []
}) 

export const categoryTodo = selector({
    key:'categoryTodo',
    get: ({get}) => {
        const state = get(todoState)
        const todo = state.filter((v) => v.category === "TO_DO")
        const done = state.filter((v) => v.category === "DONE")

        return [todo, done];
    }
})