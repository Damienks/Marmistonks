import { Timestamp } from "firebase/firestore";

export interface Comment{
    id:string,
    author:string,
    comment:string,
    date:Timestamp,
    recipeId:string,
    title:string
}

export interface Comments extends Array<Comment>{}