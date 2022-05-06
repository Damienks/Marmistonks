import { Comments } from "../models/comments"

interface Recipe{
    id:string,
    title:string,
    desc:string,
    imageUrl:string,
    ingredientList:string,
    createdAt:number,
    userName:string,
    userId:string,
    comments:Comments
}

export default Recipe