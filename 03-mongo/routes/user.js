const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}=require('../db');
// User Routes
router.post('/signup', (req, res) => {
   const {username,password}=req.body;
    User.create({username,password});
    res.status(200).send({
        'msg':'User created successfully'
    });
});

router.get('/courses',async (req, res) => {
    const {username,password}=req.headers;
    const allCourses=await Course.find({});
    res.status(200).json({course:allCourses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});
router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try{
    const {username,password}=req.headers;
    const user = await User.findOne({ username, password });
    const purchasedCourseIds =user.purchasedCourses;
    const allCourses = await Course.find({ _id: { $in: purchasedCourseIds } });
    return res.status(200).json({ courses: allCourses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router