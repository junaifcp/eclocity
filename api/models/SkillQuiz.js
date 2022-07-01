import mongoose from "mongoose"
const SkillQuizSchema=new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 desc:{
    type:String,
    max:500
 },
 img:{
    type:Array,
    default:[]
 },
 numberOfQuestions:{
    type:Number
 },
 questions:{
    type:Array,
    default:[]
 },
 attendees:{
   type:Array,
   default:[]
 },
 completed:{
    type:Array,
    default:[]
 },
 topRankers:{
    type:Array,
    default:[]
 },

},{timestamps:true})

export default mongoose.model("SkillQuiz",SkillQuizSchema)