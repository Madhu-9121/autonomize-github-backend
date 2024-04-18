const User = require("../models/User");
const axios = require("axios");
const token = "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"
const headers = {
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };
const getOrSaveUser = async (userName) => {
  try {
    // checking if user existed or not
    const existingUser = await User.findOne({ userName: userName });

    if (existingUser) {
      // console.log("exist");

      return { user: existingUser, statusCode: 200 };
    } else {
      console.log("Not-exist",userName);
      // creating new user
      const res = await axios.get(`https://api.github.com/users/${userName}`,{headers})
      console.log(res.data)
      const userData = {
        userId: res.data.id,
        userName: res.data.login,
        avatar_url: res.data.avatar_url,
        type: res.data.type,
        name: res.data.name,
        company: res.data.company,
        blog: res.data.blog,
        location: res.data.location,
        email: res.data.email,
        bio: res.data.bio,
        numberOfPublicRepos: res.data.public_repos,
        followers: res.data.followers,
        following: res.data.following,
        created_at: res.data.created_at,
        updated_at: res.data.updated_at,
        status: "created",
      };

      const newUser = await User.create(userData);
      return { user: newUser, statusCode: 201 };
    }
  } catch (e) {
    throw e;
  }
};
const findMutualFollowers = async (userName) => {
  try {
    // find user
 

    const user = await User.findOne({ userName: userName });
     

    if (user && user.friends.length ===0) {
      // console.log("not there")
      const followersres = await axios.get(
        `https://api.github.com/users/${userName}/followers`,{headers});
      const followingres = await axios.get(
        `https://api.github.com/users/${userName}/following`,{headers});
      
      // console.log(followersres)
      const friends = [];
      const followers = followersres.data
      const following = followingres.data
      // filter friends
      followers.forEach((user) => {
        // here login is similar to username from response 
        const exist = following.find((item) => item.login === user.login);
        if (exist) {
          friends.push({userName:user.login,image:user.avatar_url});
        }
      });
      console.log(friends)
      user.friends = friends;
      await user.save();

      return user;
    }else{
      console.log("already there")
      return user
    }
  } catch (e) {
    throw e;
  }
};

const searchByParameters = async (query) => {
  try {
    // console.log(query)
    // finding by query
    const users = await User.find(query)
    // console.log(users)

    return users
  } catch (e) {
    throw e;
  }
};
const softDeleted = async (userName) => {
    try {
      // find user
        const user = await User.findOne({userName:userName})
        if(user){
            // console.log(user)
            // changing status to deleted (soft delete)
            user.status = "deleted"
            await user.save()
            return true
        }

        return false
    } catch (e) {
      throw e;
    }
  };
const updateUser = async (data,userName) => {
    try {
        const{bio,location,blog} =data
        // new:true return updated user 
        const updatedUser = await User.findOneAndUpdate(
            {userName:userName},
            {$set:{location,blog,bio}},
            {new:true}
            )
        // console.log(updatedUser)
        return updatedUser
        
    } catch (e) {
      throw e;
    }
  };
  const getListOfUsers = async(sortBy,sortOrder) => {
    try {
        // console.log(sortBy,sortOrder)
        const list = await User.find().sort({[sortBy]:sortOrder}) 
        // console.log(list.length,list)
        return list
        
    } catch (e) {
      throw e;
    }
  };
module.exports = { getOrSaveUser, findMutualFollowers,searchByParameters,softDeleted,updateUser,getListOfUsers};
