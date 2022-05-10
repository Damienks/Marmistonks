// Types/Models
import { Timestamp } from "firebase/firestore";

export const convertFbTsToIntelligibleDate = (ts:Timestamp):string => {
    
    let date = new Date(ts.seconds*1000)
    
    return convertToIntelligibleDate(date)
}

export const convertToIntelligibleDate = (date:Date):string => {
    return new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)
}