import { collection, getDocs, orderBy, query } from "firebase/firestore/"
import { useEffect, useState } from "react"
import db from "../Database"
import Recipe from "./Recipe"

const Dashboard = () =>{

    const [Recipes, setRecipes] = useState({})
    const [IsLoading, setIsLoading] = useState()

    useEffect(() => {
        // Création d'une fonction asynchrone scopée de récupération
        async function getRecipesFromDb(db) {
            try{
                // Requête de la collection sur laquelle on veut taper
                const q = query(collection(db, "recipes"), orderBy("createdDate", "asc"));
                // Snapshot = en temps réel (d'ou le "await")
                const messageSnapshot = await getDocs(q);
                // On réucpère les docs à partir des données en temps réel
                const docList = messageSnapshot.docs.map(doc => doc.data()); 
                return docList;
            }catch(error){
                alert(error.code + ' : ' + error.message)
            }
        }
        // Exécution de la fonction asynchrone scopée, puis...
        getRecipesFromDb(db).then((recipesList)=>{
            setRecipes(recipesList);
            setIsLoading(false);
        });
    }, [])

    return(
        !IsLoading &&
        <div className='container'>
            <div className='rounded row bg-white p-20 justify-content-md-center'>
                <div className='row text-center m-bottom-20'>
                    <h3 className='signika color-secondary'>Les recettes les plus récentes</h3>
                </div>
                { Recipes &&
                    <ul className='row recipe-list'>
                        {
                            Object.keys(Recipes).map((key) => 
                                <li className={Recipes.length > 2 ? 'col-4' : 'col'} key={'recipe-' + Recipes[key].userId}>
                                    <Recipe  
                                        
                                        title={Recipes[key].title}
                                        desc={Recipes[key].desc}
                                        img={Recipes[key].imageUrl}
                                    />
                                </li>
                            )
                        }
                    </ul>
                }
                {
                    Recipes.length === 0 &&
                    <h2 className='signika'>Désolés ! Il semblerait qu'aucune recette n'ait encore été créée...</h2>
                }
            </div>
        </div>
        
    )
}

export default Dashboard