import express from 'express';
const router=express.Router()
 import{createQuiz,updateQuiz,deleteQuiz,getQuiz,getAllQuiz} from "../controllers/skillQuiz.js"
 import{verifyToken,verifyAdmin,verifyUser} from '../utils/verifyToken.js'

//CREATE QUIZ
router.post("/",verifyToken,createQuiz)
//UPDATE QUIZ
router.put("/:id",verifyToken,updateQuiz)
//DELETE QUIZ
router.delete("/:id",verifyToken,deleteQuiz)
//GET QUIZ
router.get("/:id",verifyToken,getQuiz)
//GET ALL QUIZs
router.get("/quizes/all",verifyToken,getAllQuiz)
// //BLOCK POST
// router.put("/block/:id",blockPost)
// //FOLLOW POST
// router.put("/:id/follow",followPost)
// //UNFOLLOW POST
// router.put("/:id/unfollow",UnFollowPost)


export default router;