import  { Firestore, collection, getDocs, orderBy, query } from "firebase/firestore"
import db from '../src/Database'

export const GET_RECIPES = "GET_RECIPES";

// Création d'une fonction asynchrone scopée de récupération des données
async function getRecipesFromDb(db:Firestore) {
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

export const getRecipes = () =>{
    return (dispatch:any) =>{
        
        // Exécution de la fonction asynchrone scopée, puis...
        getRecipesFromDb(db).then((recipesList)=>{
            dispatch({ type: GET_RECIPES, payload: recipesList });
        }).catch((e) => console.log({e}));
    }

}