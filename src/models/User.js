const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        unique: true
    },
    name: {
        type: String,
    
    },
    userId: {
        type: Number,  
    },
    avatar_url: {
        type: String,
        default: 'Not Updated'
    },
    type: {
        type: String,

    },
    company: {
        type: String,
        default: 'Not Updated'
    },
    blog: {
        type: String,
        default: 'Not Updated'
    },
    location: {
        type: String,
        default: 'Not Updated'
    },
    email: {
        type: String,
        default: 'Not Updated'
    },
    bio: {
        type: String,
        default: 'Not Updated'
    },
    numberOfPublicRepos: {
        type: Number,
      
    },
    followers: {
        type: Number,
       
    },
    following: {
        type: Number,
        
    },
    created_at:{
        type:String

    },updated_at:{
        type:String
    },
    status:{
        type: String,
        enum: ['created', 'updated', 'deleted']  
        },
        friends:[{
            userName:String
        }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
