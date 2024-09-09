const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Ishita_new_user:Ishitat%4012345@cluster0.ehjaw.mongodb.net/Courses?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
},{timestamps:true});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,//foreign key
        ref:'Course'
    }]
},{timestamps:true});

const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}