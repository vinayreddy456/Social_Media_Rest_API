const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");

dotenv.config();

const connect= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    }
    catch(error){
        console.log(error);
    }
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.get("/users",(req,res)=>{
    res.send("welocome to the users");
})

app.listen(process.env.PORT,()=>{
    connect();
    console.log("server is running on port  8800");
})