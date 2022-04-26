import  { Firestore, collection, getDocs, orderBy, query, getDoc, DocumentData, DocumentReference, doc, DocumentSnapshot } from "firebase/firestore"
import db from '../src/Database'

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";

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