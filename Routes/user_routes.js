const express=require('express');
const router=new express.Router();
const controller=require('../Controller/user_controller');
const connectToDatabase=require('../DB/connection')

router.post('/user/register',controller.UserRegister);
router.post('/user/login',controller.UserLogin);

module.exports=router;