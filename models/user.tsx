import { UserMetadata } from "firebase/auth"

interface CustomUser{
    uid:string | undefined,
    email:string | null | undefined,
    emailVerified:boolean | undefined,
    displayName:string | null | undefined
    metadata:UserMetadata | undefined
}

export default CustomUser