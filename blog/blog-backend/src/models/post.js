import mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchema = new Schema({
    title : String,
    body : String,
    tags : [String],
    publishedDate : {
        type : Date,
        default : Date.now, // 기본값을 현재 날짜로 지정
    }
})

const Post = mongoose.model('Post',PostSchema);
export default Post;