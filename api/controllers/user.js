// import { findByIdAndUpdate, findById } from "../models/User.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'

// UPDATE USER
export const updateUser=async (req,res,next)=>{
    try {
        if(req.body.password){
            try {
               const salt=await bcrypt.genSalt(10)
               req.body.password=await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                next(error)
            }
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
// DELETE USER
export const deleteUser=async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Your account has been deleted")
    } catch (error) {
        next(error)
    }
}
//GET A USER
export const getUser=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}
//GET ALL USER
export const getAllUser=async (req,res,next)=>{
    try {
        const user=await User.find()
        res.status(200).json(user)
        
    } catch (error) {
        next(error)
    }
}
//BLOCK or UNBLOCK USER
export const blockUser=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(user.blockStatus) {
            await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    blockStatus:false
                }
            })
            res.status(200).json("User has been unblocked successfully")
        }else{
            await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    blockStatus:true
                }
            })
            res.status(200).json("User has been blockes")
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
//FOLLOWING AND FOLLOWERS
export const followUser=async(req,res,next)=>{
    if(req.body.userId!==req.params.id){
         try {
            const user=await User.findById(req.body.userId)
            const currentUser=await User.findById(req.params.id)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.params.id}})
                await currentUser.updateOne({$push:{followings:req.body.userId}})
                res.status(200).json("User has been followed")
            }else{
                res.status(403).json("You already follow this user")
            }
         } catch (error) {
            next(error)
         }
    }else{
        res.status(403).json("You cant follow yourself")
    }
}
//UNFOLLOW
export const UnFollowUser=async(req,res,next)=>{
    if(req.body.userId!==req.params.id){
         try {
            const user=await User.findById(req.body.userId)
            const currentUser=await User.findById(req.params.id)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.params.id}})
                await currentUser.updateOne({$pull:{followings:req.body.userId}})
                res.status(200).json("User has been un-followed")
            }else{
                res.status(403).json("You don't follow this user")
            }
         } catch (error) {
            next(error)
         }
    }else{
        res.status(403).json("You cant un-follow yourself")
    }
}