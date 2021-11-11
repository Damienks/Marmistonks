const Recipe = ({ title, desc, img, ingredientList, createdAt }) =>{
    return(
        <div className='recipe m-bottom-20'>
            <div className='img-w m-bottom-10'>
                <img src={img} alt={title} className='w-100-p' />
            </div>
            <div className='p-top-10 p-right-20 p-bottom-10 p-left-20'>
                <h4 className='f-size-20 f-bold'>{title}</h4>
                <p>{desc}</p>
            </div>
        </div>
        
    )
}

export default Recipe
