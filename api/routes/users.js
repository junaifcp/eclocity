import express from 'express';
const router=express.Router()
import {updateUser,followUser,UnFollowUser,deleteUser,getUser,getAllUser,blockUser} from "../controllers/user.js"
import {verifyAdmin,verifyUser} from '../utils/verifyToken.js'
//UPDATE USER
router.put("/:id",verifyUser,updateUser)
//DELETE USER
router.delete("/:id",verifyUser,deleteUser)
//GET USER
router.get("/:id",getUser)
//GET ALL USERS
router.get("/",getAllUser)
//BLOCK USER
router.put("/block/:id",verifyAdmin,blockUser)
//FOLLOW USER
router.put("/:id/follow",verifyUser,followUser)
//UNFOLLOW USER
router.put("/:id/unfollow",verifyUser,UnFollowUser)


export default router;