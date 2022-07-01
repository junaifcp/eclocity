// const { findByIdAndUpdate, findById } = require("../models/User.js")
import Post from "../models/Post.js"
import { createError } from "../utils/error.js"
import User from "../models/User.js"
import SkillQuiz from "../models/SkillQuiz.js"


//CREATE QUIZE
export const createQuiz=async(req,res,next)=>{
   
      const newQuiz=new SkillQuiz(req.body)
  
      try {
        const savedQuiz=await newQuiz.save()
        res.status(200).json(savedQuiz)
      } catch (error) {
        next(error)
      }
  }
// UPDATE POST
export const updateQuiz=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.userId===req.user.id){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post has been updated successfully")
        }else{
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        next(error)
    }
}
// DELETE POST
export const deleteQuiz=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post) return next(createError(403,"There is no such post exist"))
        if(post.userId===req.user.id){
            await post.deleteOne()
            res.status(200).json("Post has been deleted successfully")
        }else{
            res.status(403).json("You can delete only your post")
        }
    } catch (error) {
        next(error)
    }
}
//GET A POST
export const getQuiz=async (req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
}
//GET ALL POST
export const getAllQuiz=async (req,res,next)=>{
    try {
        console.log("entered to all posts");
        const currentUser=await User.findById(req.user.id);
        const userPosts=await Post.find({userId:currentUser._id})
        const friendPost=await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({userId:friendId})
            })
        )
        res.json(userPosts.concat(...friendPost))
    } catch (error) {
        next(error)
    }
}
