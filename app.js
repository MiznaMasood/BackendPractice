import 'dotenv/config'
const app = express()
const DBURI = process.env.MONGODB_URI
const PORT = process.env.PORT
import express from "express"; 
import mongoose from "mongoose";  
import postModel from "./Models/postSchema.js";



// Class 2 practice

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




//  mongodb configuration 
mongoose.connect(DBURI),
mongoose.connection.on("connected", ()=> console.log("MonoDB Connected"))

mongoose.connection.on("error",(err) => console.log("MongoDB Error", err))

app.get("/", (req,res)=>{
    res.json({
        message: "Server is running",
        status: "success"

    })

})

// Create post api's

app.post('/createpost', async(req,res)=>{
    const {title, desc,PostId} = req.body;
    console.log("Request Body:", req.body);
    if(!title || !desc || !PostId){
      res.json({
        message: "All fields are required",
        status: "error"
      })
      return;
    }
    // Data save in db

    const postObj = {
      title,
      desc,
      PostId
    };
    const response = await postModel.create(postObj)

    res.json({
      message: "Post created successfully",
      status: "success",
      data: response

    })
})

// Post get

app.get('/getpost', async (req,res)=>{
  const getData =
  // await postModel.findOne({title:"Post 3"})
  // await postModel.findById({_id: "67268fd2210b7fd02b066a93"})
  await postModel.find({})
  
  res.json({
    message: "post data get successful..",
    data: getData,
  });
  res.send("get post");

})

// Post update

app.put('/updatepost', async(req,res)=>{
  const {title, desc,PostId} = req.body;
  console.log(title, desc,PostId);

  const updatepost = await postModel.findByIdAndUpdate(PostId,{title,desc})

  res.json({
    message: "Post updated successfully",
    status: "success",
    data: updatepost
  })
})

// Post Delete

app.delete('/deletepost/:id', async(req,res)=>{
  const deletepost = await postModel.findByIdAndDelete(req.params.id)
  res.json({
    message: "Post deleted successfully",
    status: "success",
    data: deletepost
  })
})



// Class 1 practice

// app.post('/api/post', (req,res)=>{
//    res.send('create Post')
  
// })

// app.put('/api/post', (req,res)=>{
//     res.send('update Post')
// })

// app.get('/api/post', (req,res)=>{
//     res.send('get all Post')
// })

// app.delete('/api/post', (req,res)=>{
//     res.send('delete Post')
// })


app.listen(PORT, (res,req)=>{
   console.log('Backend Start')
})


