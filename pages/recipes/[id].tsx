import { NextRouter, useRouter } from "next/dist/client/router";

export default function Recipe(){
    const router:NextRouter = useRouter()

    const { id } = router.query

    return <h1>{id}</h1>
}