import { atom, selector } from "recoil";

export enum Category {
    TO_DO = "TO_DO",
    DONE = "DONE"
}

export interface Itodo {
    id: number;
    text: string;
    category: Category;
}

export const todoState = atom<Itodo[]>({
    key:`todoState${Date.now()}`,
    default: []
}) 

export const categoryState = atom({
    key: `categoryState${Date.now()}`,
    default: "TO_DO"
})

export const categoryTodo = selector({
    key:'categoryTodo',
    get: ({get}) => {
        const state = get(todoState)
        const category = get(categoryState)
        
        return state.filter((v) => v.category === category)
    }
})

