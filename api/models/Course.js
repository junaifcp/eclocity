import mongoose from "mongoose"
import User from "./User.js"
const CourseSchema=new mongoose.Schema({
 userId:{
    type:String,
    required:true
 },
 advisorId:{
    type:Array,
    default:[]
 },
 expertId:{
    type:Array,
    default:[]
 },
 title:{
    type:String,
    required:true
 },
 desc:{
    type:String,
    required:true
 },
 likes:{
    type:Array,
    default:[]
 },
 duration:{
    type:Number,
    required:true
 },
 isReviewer:{
   type:Boolean,
   required:true
 },
 isMock:{
    type:Boolean,
    required:true
 },
 coutionDeposit:{
    type:Boolean,
    default:false
 },
 details:{
    type:Array,
    default:[]
 },
 startDate:{
    type:Date
 },
 endDate:{
    type:Date
 },
 reviewType:{
    type:Number,
    default:1
 },
 advisor:{
    type:Array,
    default:[]
 }
},{timestamps:true})

CourseSchema.pre("save",async function (next){
    console.log(this._id);
    const random=await User.aggregate([{$match:{isAdvisor:true}},{$sample: {size:1}}])
    const nwRandom=random[0]
    const updateRandom=await User.findOneAndUpdate({_id:nwRandom._id},{$push:{notifications:{userId:this._id.toString(),acceptStatus:false}}})
    // console.log('this is update random');
    console.log(updateRandom);
    // const status=await User.findById(nwRandom,{notifications:1})
    await this.advisorId.push({advisor:updateRandom._id.toString(),acceptStatus:false})
    next()


    // let startLoop=true;
    // const id=this._id;
    // setInterval(async() =>{
    //      console.log('this is id');
    //      console.log(id);
    //      const timeOut= setTimeout(async() => {
            
    //          const mapedStatus=await status.notifications.filter((value,i)=>{
    //             return value.userId===id.toString()
    //          })
    //          if(mapedStatus[0].acceptStatus){
                
    //             clearInterval(timer)
    //             await this.save()
    //             next()
    //          }
    //          console.log("this is status");
    //            console.log(status);
    //       },50000);
    //         timeOut()
    // },60000);
    
    //  if(!this.isModified('advisorId') && startLoop){
    //     const id=this._id;
    //     const random=await User.aggregate([{$match:{isAdvisor:true}},{$sample: {size:1}}])
    //      const nwRandom=random[0]
    //      const updateRandom=await User.findOneAndUpdate({_id:nwRandom._id},{$push:{notifications:{userId:this._id.toString(),acceptStatus:false}}})
    //      console.log('this is update random');
    //      console.log(updateRandom);
    //      setInterval(async() => {
    //         const status=await User.findById(nwRandom,{notifications:1})
    //         console.log('this is id');
    //         console.log(id);

    //          const mapedStatus=await status.notifications.filter((value,i)=>{
    //             return value.userId===id.toString()
    //          })
    //          if(mapedStatus[0].acceptStatus){
    //             clearInterval();
    //             startLoop=false;
    //             await this.advisorId.push({advisorId:updateRandom._id,acceptStatus:false})
    //             next()
    //          }
 

    //         // setTimeout(async() => {
    //         //     const nwStatus=await User.findById(nwRandom,{notifications:1})
    //         //     const mapedStatus=await nwStatus.notifications.filter((value,i)=>{
    //         //         return value.userId===id;
    //         //     })
    //         //     console.log("this is maped status");
    //         //     console.log(mapedStatus);
    //         // }, 50000);
    //         console.log("this is status");
    //         console.log(status);

    //      }, 10000);
         

    //  }

})

export default mongoose.model("Course",CourseSchema)