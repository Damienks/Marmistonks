import  { Firestore, collection, getDocs, orderBy, query, getDoc, DocumentData, DocumentReference, doc, DocumentSnapshot, where, setDoc, Timestamp } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import db from '../src/Database'

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_RECIPE_COMMENTS = "GET_RECIPE_COMMENTS";
export const POST_RECIPE_COMMENT = "POST_RECIPE_COMMENT";

// Création d'une fonction asynchrone scopée de récupération des données
export async function getRecipesFromDb(db:Firestore) {
    try{
        // Requête de la collection sur laquelle on veut taper
        const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
        // Snapshot = en temps réel (d'ou le "await")
        const messageSnapshot = await getDocs(q);
        // On réucpère les docs à partir des données en temps réel
        const docList = messageSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})); 
        return docList;
    }catch(error:any){
        console.log(error.code + ' : ' + error.message)
    }
}

// Création d'une fonction asynchrone scopée de récupération des données
export async function getRecipeByIdFromDb(db:Firestore, id:string) {
    try{
        // Requête de la collection sur laquelle on veut taper
        const docRef:DocumentReference<DocumentData> = doc(db, 'recipes', id);
        // Snapshot = en temps réel (d'ou le "await")
        const document:DocumentSnapshot<DocumentData> = await getDoc(docRef);
        return document.data();
    }catch(error:any){
        console.log(error.code + ' : ' + error.message)
    }
}

// Création d'une fonction asynchrone scopée de récupération des données
export async function getCommentsForRecipeFromDb(db:Firestore, id:string) {
    try{
        // Requête de la collection sur laquelle on veut taper
        const q = query(collection(db, "comments"), where("recipeId", "==", id), orderBy("date", "desc"));
        // Snapshot = en temps réel (d'ou le "await")
        const messageSnapshot = await getDocs(q);
        // On réucpère les docs à partir des données en temps réel
        const docList = messageSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})); 
        return docList;
    }catch(error:any){
        console.log(error.code + ' : ' + error.message)
    }
}

export const getRecipeById = (id:string) =>{
    return (dispatch:any) =>{
        
        // Exécution de la fonction asynchrone scopée, puis...
        getRecipeByIdFromDb(db, id).then((recipe)=>{
            dispatch({ type: GET_RECIPE_BY_ID, payload: recipe });
        }).catch((e) => console.log({e}));
    }

}

export const getRecipes = () =>{
    return (dispatch:any) =>{
        
        // Exécution de la fonction asynchrone scopée, puis...
        getRecipesFromDb(db).then((recipesList)=>{
            dispatch({ type: GET_RECIPES, payload: recipesList });
        }).catch((e) => console.log({e}));
    }

}

export const getCommentsForRecipe = (id:string) =>{
    return (dispatch:any) =>{
        
        // Exécution de la fonction asynchrone scopée, puis...
        getCommentsForRecipeFromDb(db, id).then((commentList)=>{
            dispatch({ type: GET_RECIPE_COMMENTS, payload: commentList });
        }).catch((e) => console.log({e}));
    }

}

export async function postCommentForRecipeInDb (db:Firestore, recipeId:string, author:string, commentTitle:string, commentText:string){
    try{
        await setDoc(doc(db, "comments", uuidv4()), {
            author,
            comment: commentText,
            date: Timestamp.fromDate(new Date(Date.now())),
            recipeId,
            title: commentTitle
          });

        return "Votre commentaire a bien été envoyé !";
    }catch(error:any){
        console.log(error.code + ' : ' + error.message)
    }
}

export const postCommentForRecipe = (recipeId:string, author:string, commentTitle:string, commentText:string) =>{
    return (dispatch:any) =>{
        // Exécution de la fonction asynchrone scopée, puis...
        postCommentForRecipeInDb(db, recipeId, author, commentTitle, commentText).then((message)=>{
            dispatch({ type: POST_RECIPE_COMMENT, payload: message });
        }).catch((e) => console.log({e}));
    }
}