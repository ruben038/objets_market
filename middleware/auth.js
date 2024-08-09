import jsonwebtoken from "jsonwebtoken"

function authentification (req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodetoken= jsonwebtoken.verify(token,"RANDOM_TOKEN_SECRET")
        const userId =decodetoken.userId
        req.auth = {
            userId:userId
        }
        next()
    }catch(error){
        res.status(401).json({error :error })
    }
    
}

export default authentification