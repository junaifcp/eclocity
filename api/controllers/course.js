// const { findByIdAndUpdate, findById } = require("../models/User.js")
import Course from '../models/Course.js'
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js"
import User from "../models/User.js"

export const createCourse=async(req,res,next)=>{
      const newCourse=new Course(req.body)
  
      try {
        
        const savedCourse=await newCourse.save()
        res.status(200).json(savedCourse)
      } catch (error) {
        next(error)
      }
  }

// UPDATE POST
export const updateCourse=async (req,res,next)=>{
    try {
        const course=await Course.findById(req.params.id)
        if(course.userId===req.user.id){
            await course.updateOne({$set:req.body})
            res.status(200).json("course has been updated successfully")
        }else{
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        next(error)
    }
}
// DELETE POST
export const deleteCourse=async (req,res,next)=>{
    try {
        const course=await Course.findById(req.params.id)
        if(!course) return next(createError(403,"There is no such post exist"))
        if(course.userId===req.user.id){
            await course.deleteOne()
            res.status(200).json("course has been deleted successfully")
        }else{
            res.status(403).json("You can delete only your course")
        }
    } catch (error) {
        next(error)
    }
}
//LIKE / DISLIKE POST
export const likeCourse=async (req,res,next)=>{
    try {
        const course=await Course.findById(req.params.id)
        if(!course.likes.includes(req.user.id)){
            await course.updateOne({$push:{likes:req.user.id}})
            res.status(200).json("The course has been liked")
        }else{
            await course.updateOne({$pull:{likes:req.user.id}})
            res.status(200).json("The course has been disliked")
        }
    } catch (error) {
        next(error)
    }
}
//GET A POST
export const getCourse=async (req,res,next)=>{
    try {
        const course=await Course.findById(req.params.id)
        res.status(200).json(course)

    } catch (error) {
        next(error)
    }
}
//GET ALL POST
export const getAllCourse=async (req,res,next)=>{
    try {
        console.log("entered to all posts");
        const currentUser=await User.findById(req.user.id);
        const userCourses=await Course.find({userId:currentUser._id})
        const friendCourses=await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Course.find({userId:friendId})
            })
        )
        res.json(userCourses.concat(...friendCourses))
    } catch (error) {
        next(error)
    }
}
export const acceptByAdvisor=async(req,res,next)=>{
      try {
        await Course.updateOne({
            "advisorId.advisor":req.user.id
        },
        {
          "$set":{
            "advisorId.$.acceptStatus":true
          } 
        }
        )
        await User.updateOne(
            {
                "notifications.courseId":req.params.id
            },
            {
                "$set":{
                    "notifications.$.acceptStatus":true
                }
            }
        )
      res.status(201).json("accepted successfully")
    } catch (error) {
        next(error)
      }

}
export const rejectByAdvisor=async(req,res,next)=>{

    try {
        const course=await Course.findById(req.params.id)
        await course.updateOne({$pull:{advisorId:{advisor:req.user.id}} })
        await User.updateOne({_id:req.user.id},{$pull:{notifications:{courseId:req.params.id}}})
        const random=await User.aggregate([{$match:{isAdvisor:true}},{$sample: {size:1}}])
        const nwRandom=random[0]
        const updateRandom=await User.findOneAndUpdate({_id:nwRandom._id},{$push:{notifications:{courseId:req.params.id,acceptStatus:false}}})
        await course.updateOne({$push:{advisorId:{advisor:nwRandom._id.toString(),acceptStatus:false}}})
        console.log(course);
        res.status(201).json("You are rejected the offer")

    } catch (error) {
        next(error)
    }
}


