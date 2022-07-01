import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {createError} from '../utils/error.js'
export const register=async (req,res,next)=>{
    try {
         const salt=bcrypt.genSaltSync(10)
         const hash=bcrypt.hashSync(req.body.password,salt)
         const isStudent=req.body.isStudent
         const isAdvisor=req.body.isAdvisor
         const isExpert=req.body.isExpert
         
        const user=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isStudent:isStudent,
            isAdvisor:isAdvisor,
            isExpert:isExpert,
        })
        const savedUser=await user.save()
        res.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
}
export const login=async(req,res,next)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        if(user.blockStatus) return next(createError(400,"your account has been blocked..."))
        if(!user) return next(createError(404,"user not found"))
        const isPassCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPassCorrect) return next(createError(400,"wrong password"))
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,...otherDetails}=user._doc
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherDetails})

    } catch (error) {
        next(error)
    }
}