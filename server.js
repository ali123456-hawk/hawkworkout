require('dotenv').config()
const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/users')
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})



app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);




if (process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    const path = require('path') 
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    }) 
}


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    
    app.listen(PORT,()=>{
        console.log("connected to mongodb & listening on port ",PORT)
    })
})
.catch((error)=>{
    console.log(error);
})

