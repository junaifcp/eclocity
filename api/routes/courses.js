import express from 'express';
const router=express.Router()
 import{rejectByAdvisor,acceptByAdvisor,createCourse,updateCourse,deleteCourse,likeCourse,getCourse,getAllCourse} from "../controllers/course.js"
 import{verifyToken,verifyAdmin,verifyUser} from '../utils/verifyToken.js'

//CREATE COURSE
router.post("/",createCourse)
//UPDATE COURSE
router.put("/:id",verifyToken,updateCourse)
//DELETE COURSE
router.delete("/:id",verifyToken,deleteCourse)
//LIKE COURSE
router.put("/:id/like",verifyToken,likeCourse)
//GET COURSE
router.get("/:id",verifyToken,getCourse)
//GET ALL COURSEs
router.get("/timeline/all",verifyToken,getAllCourse)
//UPDATE COUSE BY ADVISOR (accept or reject)
router.put("/:id/accept",verifyToken,acceptByAdvisor)
router.put("/:id/reject",verifyToken,rejectByAdvisor)
// //BLOCK COURSE
// router.put("/block/:id",blockPost)
// //FOLLOW COURSE
// router.put("/:id/follow",followPost)
// //UNFOLLOW COURSE
// router.put("/:id/unfollow",UnFollowPost)


export default router;