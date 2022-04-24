import { FC } from "react";

interface SpinnerProps{
    CssClass?: string
}

const Spinner:FC<SpinnerProps> = ({ CssClass }) =>{
    return(
        <div className={ CssClass ? 'spinner-border ' + CssClass : 'color-primary spinner-border' } role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner