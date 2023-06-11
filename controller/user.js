const fs = require('fs');
const model = require('../model/user')
const mongoose = require('mongoose');
const User = model.User;

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
