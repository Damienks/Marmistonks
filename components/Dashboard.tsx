import  { Firestore, collection, getDocs, orderBy, query, DocumentData } from "firebase/firestore"
import { FC, Fragment, useEffect, useState } from "react"
import db from "../src/Database"
import Recipe from "./Recipe"

const Dashboard:FC = () =>{

    const [Recipes, setRecipes] = useState<DocumentData[] | undefined>([])
    const [IsLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        // Création d'une fonction asynchrone scopée de récupération
        async function getRecipesFromDb(db:Firestore) {
            try{
                // Requête de la collection sur laquelle on veut taper
                const q = query(collection(db, "recipes"), orderBy("createdDate", "asc"));
                // Snapshot = en temps réel (d'ou le "await")
                const messageSnapshot = await getDocs(q);
                // On réucpère les docs à partir des données en temps réel
                const docList = messageSnapshot.docs.map(doc => doc.data()); 
                return docList;
            }catch(error:any){
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
        <Fragment>
            {!IsLoading &&
                <div className='container'>
                    <div className='rounded row bg-white p-20 justify-content-md-center'>
                        <div className='row text-center m-bottom-20'>
                            <h3 className='signika color-secondary'>Les recettes les plus récentes</h3>
                        </div>
                        { Recipes &&
                            <ul className='row recipe-list'>
                                {
                                    Object.keys(Recipes).map((key, i:number) => 
                                        <li className={Recipes.length > 2 ? 'col-4' : 'col'} key={'recipe-' + Recipes[i].userId}>
                                            <Recipe  
                                                
                                                title={Recipes[i].title}
                                                desc={Recipes[i].desc}
                                                img={Recipes[i].imageUrl}
                                            />
                                        </li>
                                    )
                                }
                            </ul>
                        }
                        {Recipes === undefined &&
                            <h2 className='signika'>Désolés ! Il semblerait qu'aucune recette n'ait encore été créée...</h2>
                        }
                    </div>
                </div>
            }
        </Fragment>
        
        
    )
}

export default Dashboard;