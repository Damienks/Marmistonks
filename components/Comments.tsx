// React stuff/types/hooks
import { FC, useState } from "react";
// Components
import Alert from "./assets/Alert";
import Spinner from "./assets/Spinner";
// Types/Models
import CustomUser from "../models/user";
import Recipe from "../models/recipe";
// Firebase
import db from "../src/Database";
// Actions
import { postCommentForRecipeInDb } from "../actions/recipe.actions";
// Hooks
import { useSelector } from "react-redux";
// Utils
import { convertFbTsToIntelligibleDate } from "../utils/dateUtils";
import Modal from "./assets/Modal";

const CommentSection:FC<Recipe> = (recipe) =>{

    const [userComment, setUserComment] = useState<string>("")
    const [userCommentTitle, setUserCommentTitle] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [postCommentError, setPostCommentError] = useState<string>("")
    const [postCommentSuccess, setPostCommentSuccess] = useState<string>("")
    
    const User:CustomUser = useSelector((state:any) => state.userReducer);

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(User != null){
            postCommentForRecipeInDb(db, recipe.id, User.displayName, userCommentTitle, userComment).then((data)=>{
                setPostCommentSuccess(data)
                window.location.reload()
            }).catch((e) => {
                setPostCommentError(e)
            });
        }else{
            setDisplayModal(true);
        }
    }

    return(
        <>
            <form action={ "/recipes/" + recipe.id } className='w-100 flex flex-col pb-5' onSubmit={ handleSubmit }>
                {recipe.comments.length > 0 &&
                    <div className='m-top-25 text-left'>
                        <h2 className='signika color-primary text-2xl'>{ "Commentaires (" + recipe.comments.length + ")" }</h2>
                        {recipe.comments.map(c => (
                            <div className='m-top-10 p-top-10 p-bottom-10' key={c.id}>
                                <hr/>
                                <h3 className='m-top-10 text-xl'>{c.title}</h3>
                                <p className='m-top-10 text-sm'>{c.comment}</p>
                                <p className='m-top-5 text-xs'>{"Commentaire ajouté par "}<span className='f-bold'>{ c.author }</span>{" le " + convertFbTsToIntelligibleDate(c.date)}</p>
                            </div>
                        ))}
                        <p className='text-2xl m-top-25'>Votre commentaire :</p>
                    </div>
                }
                {
                recipe.comments.length <= 0 &&
                    <p className='signika color-primary text-2xl m-top-25'>Soyez la première personne à commenter cette recette !</p>
                }
                {
                    <div className='w-100-p m-top-20 text-left'>
                        <input required disabled={isLoading} type='text' className='w-50 h-10 border-1 m-bottom-15 p-top-5 p-right-10 p-bottom-5 p-left-10' placeholder='Titre de votre commentaire (ex : Super recette !)' value={userCommentTitle} onChange={(e) => setUserCommentTitle(e.target.value)} ></input>
                        <textarea required disabled={isLoading} className='w-100-p h-36 border-1 p-top-5 p-right-10 p-bottom-5 p-left-10' placeholder="J'écris mon commentaire..." value={userComment} onChange={(e) => setUserComment(e.target.value)}></textarea>
                        {postCommentSuccess &&
                            <Alert message={ postCommentSuccess } className="mt-2 mb-3 bg-green-100 border-green-400 text-green-700" />
                        }
                        {postCommentError &&
                            <Alert message={ postCommentError } type='error' className="mt-2 mb-3 bg-red-100 border-red-400 text-red-700" />
                        }
                        <button disabled={isLoading} className="mt-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 disabled:bg-red-400 disabled:border-red-500 hover:border-red-500 rounded w-50" type="submit">
                            {isLoading &&
                                <Spinner CssClass="color-white w-4 h-4" />
                            }
                            {!isLoading &&
                                "Envoyer"
                            }
                        </button>
                    </div>
                }
            </form>
            {displayModal && <Modal IsForNonExistingUser={true} /> }
        </>
    )
}

export default CommentSection;