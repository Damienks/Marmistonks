import Head from 'next/head'
import  { Firestore, collection, getDocs, orderBy, query, DocumentData } from "firebase/firestore"
import { getAuth, updateProfile, signOut } from "firebase/auth";
import db, { app } from '../src/Database'
import { FC, Fragment, useEffect, useState } from "react"
import Header from "../components/Header"
import Recipe from "../components/Recipe"

const Root:FC = () =>{

  const [LoggedUserId, setLoggedUserId] = useState<string>('')
  const [LoggedUserName, setLoggedUserName] = useState<string>('')
  //const [LoggedUserEmail, setLoggedUserEmail] = useState(null)
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
    handleUser('')
  },[])

  const handleUser = (userName:string) =>{
    getAuth(app).onAuthStateChanged(function(user:any) {
      if (user) {
        if(userName != null && userName.trim() !== ""){
          updateProfile(user, {
              displayName : userName
          }).then(() => {
            setLoggedUserId(user.auth.currentUser.uid)
            setLoggedUserName(userName)
            //setLoggedUserEmail(user.auth.currentUser.email)
            console.log(user.auth.currentUser.displayName)
          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorCode + ' : ' + errorMessage)
          });
          setIsLoading(false)
        }
        else{
          setLoggedUserId(user.auth.currentUser.uid)
          setLoggedUserName(user.auth.currentUser.displayName)
          //setLoggedUserEmail(user.auth.currentUser.email)
          setIsLoading(false)
        }
      } else {
        console.log('Aucun utilisateur connecté...')
        setIsLoading(false)
      }
    });
  }

  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.reload();
    }).catch((error) => {
        alert(error.code + ' : ' + error.message)
    });
  }

  return(
    <Fragment>
      <Head>
        <title>Marmistonks</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="app source-sans color-primary">
        { !IsLoading &&
          <Header 
          userId={ LoggedUserId } 
          userName={ LoggedUserName } 
          signOutEvent={ handleSignOut } />
        }
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
      </div>
    </Fragment>
  )
}

export default Root
