const mongoose=require('mongoose')
const RankSchema=new mongoose.Schema({
    currentRank:{type:Number,default:99}
})
const RankModel=mongoose.model('Rank',RankSchema)
module.exports=RankModel