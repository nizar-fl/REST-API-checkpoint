var express = require('express');
var router = express.Router();
const User = require("../models/user")

const getallusers = async(req,res)=>{
  try {
    User.find((err,users)=>{
      if(!err){
        res.status(400).json({msg:"something went wrong"})
      }
      res.status(200).json(users)
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
const addUser = async(req,req)=>{
  try {
    const newuser = new User({...req.body})
    newuser.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong or some informations are missing" });
      }
      res.status(201).json({ msg: "User created successfully" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
const deleteUser = async(req,res)=>{
  const userId = req.params.userid
  try {
    const findUser = await User.findById(userId);
      if(!findUser){
        res.status(400).json({msg: "User doesn't exist"})
      }
      User.deleteOne({_id: userId},(err) => {
        if (err) {
          return res.status(500).json({ msg: "Something went wrong" });
        }
        res.status(200).json({ msg: "User deleted" });
      })    
    
    
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}
const editUser = async(req,res)=>{
  const userid  = req.params.userid
  try {
    const findUser = await User.findById(userid);
      if(!findUser){
        res.status(400).json({msg: "User doesn't exist"})
      }
      User.updateOne( {
        _id: userid,
      },
      { ...req.body },
      (err) => {
        if (err) {
          return res.status(500).json({ msg: "Something went wrong " });
        }
        res.status(200).json({ msg: "userid updated" });
      })

    
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}


router.get("/getAllusers",getallusers)
router.post("/adduser",addUser)
router.delete("/deleteUser/:userid",deleteUser)
router.put("/editUser/:userid",editUser)


module.exports = router;
