const express=require('express');
const router=new express.Router();
const controller=require('../Controller/movie_controller');
const connectToDatabase=require('../DB/connection')

router.post('/user/register',controller.UserRegister);

module.exports=router;