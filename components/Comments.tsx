import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { postCommentForRecipeInDb } from "../actions/recipe.actions";
import Recipe from "../models/recipe";
import Spinner from "../components/Spinner";
import CustomUser from "../models/user";
import db from "../src/Database";
import Alert from "./Alert";

const CommentSection:FC<Recipe> = (recipe) =>{

    const [userComment, setUserComment] = useState<string>("")
    const [userCommentTitle, setUserCommentTitle] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postCommentError, setPostCommentError] = useState<string>("")
    const [postCommentSuccess, setPostCommentSuccess] = useState<string>("")
    
    const User:CustomUser = useSelector((state:any) => state.userReducer);

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsLoading(true)
        postCommentForRecipeInDb(db, recipe.id, User.displayName, userCommentTitle, userComment).then((data)=>{
            setPostCommentSuccess(data)
            window.location.reload()
        }).catch((e) => {
            setPostCommentError(e)
        });
    }

    return(
        
        <form action={ "/recipes/" + recipe.id } className='w-100 flex flex-col pb-5' onSubmit={ handleSubmit }>
            {recipe.comments.length > 0 &&
                <div className='m-top-25 text-left'>
                    <h2 className='signika color-primary text-2xl'>{ "Commentaires (" + recipe.comments.length + ")" }</h2>
                    {recipe.comments.map(c => (
                        <div className='m-top-10 p-top-10 p-bottom-10' key={c.id}>
                            <hr/>
                            <h3 className='m-top-10 text-xl'>{c.title}</h3>
                            <p className='m-top-10 text-sm'>{c.comment}</p>
                            <p className='m-top-5 text-xs'>{"Commentaire ajouté par "}<span className='f-bold'>{ c.author }</span>{" le " + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(c.date.nanoseconds)}</p>
                        </div>
                    ))}
                    <p className='text-2xl m-top-25'>Votre commentaire :</p>
                </div>
                }
                {
                recipe.comments.length <= 0 &&
                    <p className='signika color-primary text-2xl m-top-25'>Soyez la première personne à commenter cette recette !</p>
                }
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
            </form>
        
    )
}

export default CommentSection;