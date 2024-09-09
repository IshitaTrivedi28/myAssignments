const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course}=require('../db');
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require("../config.js");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    //simple database put username and password
    const {username,password}=req.body;
    Admin.create({username,password})
    .then(()=>{
        res.json({msg:'Admin created successfully'});
    }).catch((err)=>{
         res.status(403).send({msg:'Error in admin creation'+err.code })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;
    //validate user: if present in db
    const user=await Admin.find({
        username,password
    })
    //if exists then generate a token for user
    if(user){
//encodes this data({username} ) into token with secret key

            const token=jwt.sign({
                username
            },JWT_SECRET);
            res.json({
                token
            });

        }
        else{
            res.status(411).json({
                "msg":'Wrong username and password'
            });
        }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const username=req.username;
    console.log(username);
    res.json({ msg: `Course creation by user: ${username}` });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;