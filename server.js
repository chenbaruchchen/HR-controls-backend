const express = require('express')
const app = express()
console.log("pas1s")

 const mongoose = require("mongoose");
const usersRoutes=require("./api/routes/users")
const secretRoutes=require("./api/routes/secret")

require("dotenv").config()
// (async () => {
//      await mongoose.connect(process.env.db,{useNewUrlParser: true, useUnifiedTopology: true})
//      ;
// })();
mongoose.connect(process.env.db,{useNewUrlParser: true, useUnifiedTopology: true})
    

mongoose.connection.on("connected",()=>{
    console.log("mongoose connect")
})
console.log("pass")

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

  app.use(express.json())


app.use("/api/users", usersRoutes)
app.use("/api/users/secret", secretRoutes)

app.get('/', function (req, res) {
    res.send('Hello World')
  })


  app.post('/send', function (req, res) {
console.log(req.body)  
})
    


app.use((req,res,next)=>{
    const error=new Error("יש אין סוף דפים, עדיין לא פיתחנו את כולם")
    error.status=404
    next(error)
} )

app.use((error, req,res,next)=>{
   res.status(error.status||500)
   res.json({
       error:{
           message:error.message
       }
   })
} )



app.listen(3000)