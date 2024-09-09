const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course}=require('../db/index');
// Admin Routes
// no admin middleware required
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    //check if user already exists
    await Admin.create({
        username:username,
        password:password
    }).then(()=>{
        res.json({
            message:'Admin created successfully'
        })
    }).catch((error)=>{
        res.json({
            message:'Error in admin creation'
        })
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Extract data from request
    const { username, password } = req.headers;
    const { title, description, price, imageLink } = req.body;

    try {
        // Create a new course
        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink
        });

        // Send a success response
        res.json({
            message: 'Course created successfully',
            id: newCourse._id
        });
    } catch (error) {
        // Send an error response
        res.status(500).json({
            message: error.message
        });
    }
});


router.get('/courses', adminMiddleware, async (req, res) => {
    try{
    // Implement fetching all courses logic
    const {username,password}=req.headers;
    const allCourses=await Course.find({
        // username,password
    });
    res.json({courses:allCourses});
}
catch(error){
        // Send an error response
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;