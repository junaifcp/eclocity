import express from 'express';
const router=express.Router()
 import{createPost,updatePost,deletePost,likePost,getPost,getAllPost} from "../controllers/post.js"
 import{verifyToken,verifyAdmin,verifyUser} from '../utils/verifyToken.js'

//CREATE POST
router.post("/",verifyToken,createPost)
//UPDATE POST
router.put("/:id",verifyToken,updatePost)
//DELETE POST
router.delete("/:id",verifyToken,deletePost)
//LIKE POST
router.put("/:id/like",verifyToken,likePost)
//GET POST
router.get("/:id",verifyToken,getPost)
//GET ALL POSTs
router.get("/timeline/all",verifyToken,getAllPost)
// //BLOCK POST
// router.put("/block/:id",blockPost)
// //FOLLOW POST
// router.put("/:id/follow",followPost)
// //UNFOLLOW POST
// router.put("/:id/unfollow",UnFollowPost)


export default router;