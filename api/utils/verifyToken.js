
import jwt from 'jsonwebtoken'
import {createError} from '../utils/error.js'

export const verifyToken=(req,res,next)=>{
    console.log("enterrerer");
    const token=req.cookies.access_token;
    if(!token) return next(createError(401,"You are not authorised"))
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"your token is not valid"))
        req.user=user
        // console.log("enterrerer tgregt");
        next()
    

    })
}

export const verifyUser=(req,res,next)=>{
    console.log("entered v user");
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id ||req.user.isAdmin ){
            console.log("token are sane");
            next()
        }else{
         return next(createError(403,"you are not authorised"))
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
         return next(createError(403,"you are not authorised"))
        }
    })
}